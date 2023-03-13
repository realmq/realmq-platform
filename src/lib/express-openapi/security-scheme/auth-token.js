const httpError = require('../../error/http');

const unauthorizedError = message => httpError.unauthorized({
  challenge: 'Bearer',
  code: 'InvalidAuthorization',
  message,
});

module.exports = ({authenticateUser, logger}) =>
  /**
   * @function authTokenScheme
   * @param {object} request Request
   * @param {object} req.headers Request headers
   * @param {?string} req.headers.authorization Authorization header
   * @returns {Promise<boolean>} Resolves true on success, otherwise rejects with an http error.
   */
  async request => {
    try {
      const auth = request.headers.authorization;
      if (!auth) {
        throw unauthorizedError('Missing authorization');
      }

      const [scheme, token] = auth.trim().split(' ');
      if (scheme.toLowerCase() !== 'bearer' || !token) {
        throw unauthorizedError('Invalid authorization scheme');
      }

      const {ok, result, error} = await authenticateUser({token});
      if (!ok) {
        throw error;
      }

      if (!result.authenticated) {
        throw unauthorizedError('Invalid credentials');
      }

      request.auth = result.auth;
      request.user = result.user;
      return true;
    } catch (error) {
      logger.error(`Unexpected error on authenticating request: ${error}`, {error});
      throw httpError.internal({previous: error});
    }
  };

