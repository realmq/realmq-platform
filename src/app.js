const {json: jsonBodyParser} = require('body-parser');
const compression = require('compression');
const express = require('express');
const initBrokerTasks = require('./tasks/broker');
const initBrokerMiddleware = require('./api/broker/bootstrap');
const bootstrapDatabase = require('./bootstrap/database');

/**
 * @param {Object} logger the logging object
 * @return {Promise<{http: Function}>} bootstrapped resources
 */
const bootstrap = async ({logger}) => {
  const http = express();
  http.use(compression());
  http.use(jsonBodyParser());
  http.use((req, res, next) => {
    logger.info(`HTTP: ${req.method} ${req.url}`);
    next();
  });

  const brokerTasks = initBrokerTasks({
    loadAuth: _ => null,
    loadTopicPermissions: _ => ({read: false, write: false})
  });
  const tasks = {broker: brokerTasks};

  const brokerMiddleware = initBrokerMiddleware(brokerTasks);
  const api = {broker: {v1: brokerMiddleware}};

  return {http, tasks, api};
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

      const {http, api} = await bootstrap({config, logger});

      http.use('/broker/v1', api.broker.v1);

      await bootstrapDatabase({config, logger});

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
    },
  };
};
