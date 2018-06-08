const {success} = require('../../lib/result');

/**
 * @typedef {object} ClientTasks~userAuthenticationResult
 * @prop {boolean} authenticated Authenticated or not
 * @prop {AuthModel} [auth] Auth model
 * @prop {UserModel} [user] User model
 */
/**
 * @param {AuthRepository} authRepository Auth repository
 * @param {UserRepository} userRepository User repository
 * @returns {ClientTasks#authenticateUser} Task
 */
module.exports = ({authRepository, userRepository}) =>
  /**
   * @typedef {Function} ClientTasks#authenticateUser
   * @param {string} token
   * @return {Promise<Result<ClientTasks~userAuthenticationResult>>}
   */
  async ({token}) => {
    const auth = await authRepository.findOneByToken(token);
    if (!auth) {
      return success({authenticated: false});
    }

    const user = await userRepository.findOne({id: auth.userId});
    if (!user) {
      return success({authenticated: false});
    }

    return success({
      authenticated: true,
      auth,
      user,
    });
  };
