const httpError = require('../../error/http');

const unauthorizedError = message => httpError.unauthorized({
  challenge: 'Bearer',
  code: 'InvalidAuthorization',
  message,
});

module.exports = ({authenticateUser, logger}) => {
  /**
   * @function authTokenScheme
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

      const [scheme, token] = auth.trim().split(' ');
      if (scheme.toLowerCase() !== 'bearer' || !token) {
        return Promise.reject(unauthorizedError('Invalid authorization scheme'));
      }

      const {ok, result, error} = await authenticateUser({token});
      if (!ok) {
        throw error;
      }

      if (!result.authenticated) {
        return Promise.reject(unauthorizedError('Invalid credentials'));
      }

      req.auth = result.auth;
      req.user = result.user;
      return true;
    } catch (error) {
      logger.error(`Unexpected error on authenticating request: ${error}`, {error});
      throw httpError.internal({previous: error});
    }
  };
};
