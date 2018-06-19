const {connect} = require('mqtt');

module.exports = ({config, logger}) => new Promise((resolve, reject) => {
  const client = connect({
    protocol: config.broker.protocol,
    host: config.broker.host,
    port: config.broker.port,
    username: config.broker.username,
    password: config.broker.password,
    // Increase timeout to compensate startup delay:
    // on startup broker may call webhook endpoints which are not live yet and
    // wait some time to fail before standard auth mechanisms kick in so we
    // have to bridge that gap.
    connectTimeout: 60 * 1000, // Default: 30 * 1000
    // Increase reconnect period to compensate startup delay:
    // after startup it might take some time before broker becomes available
    // so no sense to brute force a connection here.
    reconnectPeriod: 10 * 1000, // Default: 1 * 1000
  });

  // Install general error logger
  client.on('error', err => {
    logger.warn(`Broker connection error: ${err}`, {error: err});
  });

  // Check for start up errors
  let startupErrorCount = 0;
  const maxStartupErrors = 10;
  const startupErrorHandler = () => {
    startupErrorCount += 1;
    if (startupErrorCount >= maxStartupErrors) {
      client.removeListener('error', startupErrorHandler);
      reject(new Error(`Reached maximum broker connect errors`));
    }
  };
  client.on('error', startupErrorHandler);
  client.once('connect', () => {
    client.removeListener('error', startupErrorHandler);
    logger.debug('Broker connection established');
    resolve(client);
  });
});
