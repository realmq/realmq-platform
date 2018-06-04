const initBrokerTasks = require('./tasks/broker');
const initBrokerMiddleware = require('./api/broker/bootstrap');
const bootstrap = require('./bootstrap');

/**
 * Bootstrap api.
 *
 * @return {Promise<Object>} bootstrapped api resource
 */
const bootstrapApi = async () => {
  const brokerTasks = initBrokerTasks({
    loadAuth: _ => null,
    loadTopicPermissions: _ => ({read: false, write: false})
  });
  const tasks = {broker: brokerTasks};

  const brokerMiddleware = initBrokerMiddleware(brokerTasks);
  const api = {broker: {v1: brokerMiddleware}};

  return api;
};

module.exports = ({config, logger}) => {
  let started = false;
  let httpServer;

  return {
    start: async () => {
      if (started) {
        return;
      }
      started = true;
      logger.debug('starting...');

      const {http} = await bootstrap({config, logger});
      const api = await bootstrapApi();
      http.use('/broker/v1', api.broker.v1);

      httpServer = http.listen(config.http.port);

      logger.info('started');
    },
    stop: async () => {
      if (!started) {
        return;
      }
      started = false;
      logger.debug('stopping...');

      await new Promise((resolve, reject) => {
        logger.debug('closing http connections');
        httpServer.close(err => {
          if (err) {
            return reject(err);
          }

          resolve();
          logger.debug('connections closed');
        });
      });

      logger.info('stopped');
      return 0;
    },
  };
};
