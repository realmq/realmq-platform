/**
 * @param {number} status The http status code
 * @param {string} message The error message
 * @param {string} code The error code
 * @return {HttpError} The http error object
 */
const error = ({status, message, code, previous}) =>
  /**
   * @class HttpError
   * @property {number} status The http status code
   * @property {string} message The error message
   * @property {string} code The error code
   * @property {boolean} isHttpError Flag that indicates http error type.
   * @property {object} [previous] Previous error
   */
  ({
    isHttpError: true,
    status,
    message,
    code,
    previous,
  });

/**
 * Not found error
 * @param {string} path
 * @returns {HttpError}
 */
error.notFound = ({path}) => error({
  status: 404,
  code: 'EndpointNotFound',
  message: `${path} does not exist.`,
});

/**
 * Internal server error
 * @param {object} [previous] Previous error
 * @returns {HttpError}
 */
error.internal = ({previous} = {}) => error({
  status: 500,
  code: 'InternalServerError',
  message: 'The request could not be processed.',
  previous,
});

module.exports = error;
