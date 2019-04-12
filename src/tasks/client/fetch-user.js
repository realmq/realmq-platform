const {success, failure} = require('../../lib/result');
const taskError = require('../../lib/error/task');

/**
 * Init fetch user task
 * @param {UserRepository} userRepository User repository
 * @returns {ClientTasks#fetchUser} Task
 */
module.exports = ({userRepository}) =>
  /**
   * @function ClientTasks#fetchUser
   * @param {AuthModel} authToken Authentication
   * @param {string} id User id
   * @returns {Result<?UserModel>}
   */
  async ({authToken, id}) => {
    const {scope, realmId} = authToken;

    if (scope !== 'admin') {
      return failure(taskError({
        code: 'InsufficientPrivileges',
        message: 'Insufficient privileges to access users.',
      }));
    }

    return success(await userRepository.findOne({realmId, id}));
  };
