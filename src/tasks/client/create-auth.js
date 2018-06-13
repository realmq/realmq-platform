const {success, failure} = require('../../lib/result');
const {
  alreadyExists: errorAlreadyExists,
  insufficientPrivileges: errorInsufficientPrivileges,
} = require('./auth/errors');

/**
 * Init create auth task
 * @param {AuthRepository} authRepository Auth repository
 * @param {UserRepository} userRepository User repository
 * @returns {ClientTasks#createAuth} Create auth task
 */
module.exports = ({authRepository, userRepository}) =>
  /**
   * @function ClientTasks#createAuth
   * @param {AuthModel} authToken Authorization
   * @param {object} data Data
   * @returns {Result<AuthModel>}
   */
  async ({authToken, data}) => {
    const {scope, realmId} = authToken;

    if (scope !== 'admin') {
      return failure(errorInsufficientPrivileges({
        action: 'create an auth token',
      }));
    }

    const user = await userRepository.findOrCreate({realmId, id: authToken.userId});
    try {
      const createdAuth = await authRepository.create({
        ...data,
        userId: user.id,
        realmId,
      });
      return success(createdAuth);
    } catch (creationError) {
      if (creationError.isDuplicateKeyError) {
        return failure(errorAlreadyExists(), creationError);
      }
      throw creationError;
    }
  };
