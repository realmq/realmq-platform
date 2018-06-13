const {success, failure} = require('../../lib/result');
const error = require('../../lib/error/task');

/**
 * Init create auth task
 * @param {AuthRepository} authRepository Auth Repository
 * @returns {ClientTasks#createAuth} Create auth task
 */
module.exports = ({authRepository}) =>
  /**
   * @function ClientTasks#createAuth
   * @param {AuthModel} authToken Authorization
   * @param {object} data Data
   * @returns {Result<AuthModel>}
   */
  async ({authToken, data}) => {
    const {scope, realmId} = authToken;

    if (scope !== 'admin') {
      return failure(error({
        code: 'InsufficientPrivileges',
        message: 'Insufficient privileges to create a auth token.',
      }));
    }

    try {
      const createdAuth = await authRepository.create({
        ...data,
        realmId,
      });
      return success(createdAuth);
    } catch (creationError) {
      if (creationError.isDuplicateKeyError) {
        return failure(
          error({
            code: 'AuthTokenAlreadyExists',
            message: 'A auth token with the same id already exists.',
          }),
          creationError
        );
      }
      throw creationError;
    }
  };
