const status = require('./status');
const initResponder = require('./responder');

const statusUnauthorized = message => status.unauthorized({
  challenge: 'Bearer',
  code: 'INVALID_AUTHORIZATION',
  message,
});

module.exports = ({authenticateUser, logger}) => {
  /**
   * @function authTokenScheme
   * @param {object} req Request
   * @param {object} req.headers Request headers
   * @param {?string} req.headers.authorization Authorization header
   * @param {*} scopes Scopes
   * @param {*} definitions Definitions
   * @param {function(status: *, satisfied: boolean)} callback Callback
   * @returns {Promise<void>} Nothing
   */
  return async (req, scopes, definitions, callback) => {
    const responder = initResponder(callback);
    try {
      const auth = req.headers.authorization;
      if (!auth) {
        return responder.decline(statusUnauthorized('Missing authorization'));
      }

      const [scheme, token] = auth.trim().split(' ');
      if (scheme.toLowerCase() !== 'bearer' || !token) {
        return responder.decline(statusUnauthorized('Invalid authorization scheme'));
      }

      const {ok, result, error} = await authenticateUser({token});
      if (!ok) {
        throw error;
      }

      if (!result.authenticated) {
        return responder.decline(statusUnauthorized('Invalid credentials'));
      }

      req.auth = result.auth;
      req.user = result.user;
      return responder.grant();
    } catch (err) {
      logger.error(`Unexpected error on authenticating request: ${err}`, {err});
      return responder.fail();
    }
  };
};
