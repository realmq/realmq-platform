const {decode: base64Decode} = require('../../base64');
const httpError = require('../../error/http');

const unauthorizedError = message => httpError.unauthorized({
  challenge: 'Basic realm="Account credentials"',
  code: 'InvalidAuthorization',
  message,
});

/**
 *
 * @param {function({email: string, password: string}): Promise<boolean>} authenticateAccount
 *        Function to authenticate account
 * @param {{error: function}} logger Logging facility
 * @returns {Function} Security handler
 */
module.exports = ({authenticateAccount, logger}) => {
  /**
   * @function accountCredentialsScheme
   * @param {object} req Request
   * @param {object} req.headers Request headers
   * @param {?string} req.headers.authorization Authorization header
   * @returns {Promise<boolean>} Resolves true on success, otherwise rejects with an http error.
   */
  return async req => {
    try {
      const auth = req.headers.authorization;
      if (!auth) {
        return Promise.reject(unauthorizedError('Missing authorization'));
      }

      const [scheme, value] = auth.trim().split(' ');
      if (scheme.toLowerCase() !== 'basic' || !value) {
        return Promise.reject(unauthorizedError('Invalid authorization scheme'));
      }

      const [username, password] = base64Decode(value).split(':');
      const result = await authenticateAccount({email: username, password});
      if (!result.authenticated) {
        return Promise.reject(unauthorizedError('Invalid credentials'));
      }

      req.account = result.account;
      return true;
    } catch (error) {
      logger.error(`Unexpected error on authenticating request: ${error}`, {error});
      throw httpError.internal({previous: error});
    }
  };
};
