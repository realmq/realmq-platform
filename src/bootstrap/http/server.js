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
    logHttpRequest({ logger, req });
    next();
  });

  return http;
};

/**
 * Safely log http requests.
 *
 * @param {Object} logger
 * @param {Object} req
 */
function logHttpRequest({ logger, req }) {
  const url = obfuscateUrl(req.originalUrl);

  logger.info(`HTTP: ${req.method} ${url}`);
}

/**
 * Obfuscate any secrets like api-keys passed via get parameter.
 *
 * @param {string} url
 * @returns {string}
 */
function obfuscateUrl(url) {
  return url.replace(/(api-key)(:|=)([^&\n]+)/, '$1$2***');
}
