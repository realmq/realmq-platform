const {success, failure} = require('../../lib/result');
const {
  alreadyExists: errorAlreadyExists,
  insufficientPrivileges: errorInsufficientPrivileges,
} = require('./auth/errors');

/**
 * Init create auth task
 * @param {AuthTokenRules} authTokenRules Auth rules
 * @param {AuthRepository} authRepository Auth repository
 * @param {UserRepository} userRepository User repository
 * @returns {ClientTasks#createAuth} Create auth task
 */
module.exports = ({authTokenRules, authRepository, userRepository}) =>
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

    const user = await userRepository.findOrCreate({realmId, id: data.userId});
    try {
      const ephemeralAuth = await authTokenRules.buildEntity({
        ...data,
        userId: user.id,
        realmId,
      });
      const persistedAuth = await authRepository.create(ephemeralAuth);
      return success(persistedAuth);
    } catch (creationError) {
      if (creationError.isDuplicateKeyError) {
        return failure(errorAlreadyExists(), creationError);
      }
      throw creationError;
    }
  };
