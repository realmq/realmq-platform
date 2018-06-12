const {success, failure} = require('../../lib/result');
const error = require('../../lib/error/task');

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
      return failure(error({
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
    } catch (creationError) {
      if (creationError.isDuplicateKeyError) {
        return failure(
          error({
            code: 'UserAlreadyExists',
            message: 'A user with the same id already exists.',
          }),
          creationError
        );
      }
      return Promise.reject(creationError);
    }
  };
