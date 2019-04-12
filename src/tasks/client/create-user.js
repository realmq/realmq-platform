const {success, failure} = require('../../lib/result');
const taskError = require('../../lib/error/task');

/**
 * Init create user task
 * @param {UserRepository} userRepository User repository
 * @returns {ClientTasks#createUser} Task
 */
module.exports = ({userRepository}) =>
  /**
   * @function ClientTasks#createUser
   * @param {AuthModel} authToken Authentication
   * @param {object} data Entity data
   * @returns {Result<UserModel>}
   */
  async ({authToken, data}) => {
    const {scope, realmId} = authToken;

    if (scope !== 'admin') {
      return failure(taskError({
        code: 'InsufficientPrivileges',
        message: 'Insufficient privileges to create a user.',
      }));
    }

    try {
      const user = await userRepository.create({
        ...data,
        realmId,
      });
      return success(user);
    } catch (error) {
      if (error.isDuplicateKeyError) {
        return failure(
          taskError({
            code: 'UserAlreadyExists',
            message: 'A user with the same id already exists.',
          }),
          error
        );
      }

      return Promise.reject(error);
    }
  };
