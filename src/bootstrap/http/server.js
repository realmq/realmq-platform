const express = require('express');
const compression = require('compression');
const {json: jsonBodyParser} = require('body-parser');

/**
 * Initialize express http app.
 *
 * @param {Object} logger Logger
 * @return {Object} Express App
 */
module.exports = ({logger}) => {
  const http = express();
  http.use(compression());
  http.use(jsonBodyParser());
  http.use((req, res, next) => {
    logger.info(`HTTP: ${req.url}`);
    next();
  });

  return http;
};
