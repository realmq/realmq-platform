const compression = require('compression');
const express = require('express');

/**
 * @param {Object} logger the logging object
 * @return {Promise<{http: Function}>} bootstrapped resources
 */
const bootstrap = async ({logger}) => {
  const http = express();
  http.use(compression());
  http.use((req, res, next) => {
    logger.info(`HTTP: ${req.url}`);
    next();
  });

  return {http};
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

      http.use((req, res) => res.status(404).send());
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
    }
  };
};
