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
  http.use((request, response, next) => {
    logHttpRequest({logger, request});
    next();
  });

  return http;
};

/**
 * Safely log http requests.
 *
 * @param {Object} logger
 * @param {Object} request
 */
function logHttpRequest({logger, request}) {
  const url = obfuscateUrl(request.originalUrl);

  logger.info(`HTTP: ${request.method} ${url}`);
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
