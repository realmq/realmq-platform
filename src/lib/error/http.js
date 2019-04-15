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

error.notAllowed = ({path}) => error({
  status: 403,
  code: 'InsufficientPrivileges',
  message: `Insufficient privileges to access ${path}`,
});

/**
 * Not found error
 * @param {string} path The url path that was not found
 * @returns {HttpError} The not found error object
 */
error.notFound = ({path}) => error({
  status: 404,
  code: 'EndpointNotFound',
  message: `${path} does not exist.`,
});

/**
 * Internal server error
 * @param {object} [previous] Previous error
 * @returns {HttpError} The internal server error object
 */
error.internal = ({previous} = {}) => error({
  status: 500,
  code: 'InternalServerError',
  message: 'The request could not be processed.',
  previous,
});

/**
 * Create unauthorized error
 * @param {String} [code] Error code
 * @param {String} [message] Error message
 * @param {String} [challenge] Authorization challenge
 * @returns {HttpError} The unauthorized error
 */
error.unauthorized = ({code = 'InvalidAuthorization', message, challenge}) => error({
  status: 401,
  code,
  message,
  challenge,
});

module.exports = error;
