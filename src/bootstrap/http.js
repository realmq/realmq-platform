const express = require('express');
const compression = require('compression');
const {json: jsonBodyParser} = require('body-parser');

/**
 * Initialize express http app.
 *
 * @param {Object} logger Logger
 * @param {object} middlewares Middlewares
 * @return Promise<Object> Express App
 */
module.exports = async ({logger, middlewares}) => {
  const http = express();
  http.use(compression());
  http.use(jsonBodyParser());
  http.use((req, res, next) => {
    logger.info(`HTTP: ${req.url}`);
    next();
  });

  http.use('/broker', middlewares.broker);
  http.use((req, res) => res.status(404).send());

  return http;
};
