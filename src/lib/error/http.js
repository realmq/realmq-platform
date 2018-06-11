/**
 * @param {number} status The http status code
 * @param {string} message The error message
 * @param {string} code The error code
 * @return {HttpError} The http error object
 */
module.exports = ({status, message, code}) =>
  /**
   * @class HttpError
   * @property {number} status The http status code
   * @property {string} message The error message
   * @property {string} code The error code
   * @property {boolean} isHttpError Flag that indicates http error type.
   */
  ({
    isHttpError: true,
    status,
    message,
    code,
  });
