const {decode: base64Decode} = require('../../base64');
const status = require('./status');
const initResponder = require('./responder');

const statusUnauthorized = message => status.unauthorized({
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

      const [scheme, value] = auth.trim().split(' ');
      if (scheme.toLowerCase() !== 'basic' || !value) {
        return responder.decline(statusUnauthorized('Invalid authorization scheme'));
      }

      const [username, password] = base64Decode(value).split(':');
      const result = await authenticateAccount({email: username, password});
      if (!result.authenticated) {
        return responder.decline(statusUnauthorized('Invalid credentials'));
      }

      req.account = result.account;
      return responder.grant();
    } catch (err) {
      logger.error(`Unexpected error on authenticating request: ${err}`, {err});
      return responder.fail();
    }
  };
};
