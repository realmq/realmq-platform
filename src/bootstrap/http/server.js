const express = require('express');
const compression = require('compression');
const cors = require('cors');
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
  http.use(cors());
  http.use((req, res, next) => {
    logger.info(`HTTP: ${req.method} ${req.originalUrl}`);
    next();
  });

  return http;
};
