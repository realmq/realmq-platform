const bootstrap = require('./bootstrap');

module.exports = ({config, logger}) => {
  let started = false;
  let httpServer;

  return {
    async start() {
      if (started) {
        return;
      }

      started = true;
      logger.debug('starting...');

      const {http} = await bootstrap({config, logger});

      httpServer = http.listen(config.http.port);

      logger.info('started');
    },
    async stop() {
      if (!started) {
        return;
      }

      started = false;
      logger.debug('stopping...');

      await new Promise((resolve, reject) => {
        logger.debug('closing http connections');
        httpServer.close(error => {
          if (error) {
            return reject(error);
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
