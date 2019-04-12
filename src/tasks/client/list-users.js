const {success, failure} = require('../../lib/result');
const taskError = require('../../lib/error/task');

/**
 * Init list users task
 * @param {UserRepository} userRepository User repository
 * @returns {ClientTasks#listUsers} Task
 */
module.exports = ({userRepository}) =>
  /**
   * @function ClientTasks#listUsers
   * @param {AuthModel} authToken Authentication
   * @param {number} offset Offset
   * @param {number} limit Limit
   * @returns {Result<PaginatedList<UserModel>>}
   */
  async ({authToken, offset, limit}) => {
    const {scope, realmId} = authToken;

    if (scope !== 'admin') {
      return failure(taskError({
        code: 'InsufficientPrivileges',
        message: 'Insufficient privileges to list users.',
      }));
    }

    return success(await userRepository.find({realmId}, {offset, limit}));
  };
