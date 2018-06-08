const bootstrap = require('./bootstrap');

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
