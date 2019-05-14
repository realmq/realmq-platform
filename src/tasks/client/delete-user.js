const {success, failure} = require('../../lib/result');
const taskError = require('../../lib/error/task');

/**
 * Init delete user task.
 * @param {UserRepository} userRepository The user repository
 * @param {AuthRepository} authRepository The auth repository
 * @param {SubscriptionRepository} subscriptionRepository The subscription repository
 * @returns {ClientTasks#deleteUser} Task
 */
module.exports = ({userRepository, authRepository, subscriptionRepository}) =>
  /**
   * Delete a user and its auth tokens and subscriptions.
   * @function ClientTasks#deleteUser
   * @param {AuthModel} authToken Authentication
   * @param {string} id User id
   * @returns {Result<UserModel>}
   */
  async ({authToken, id}) => {
    const {scope, realmId} = authToken;

    if (scope !== 'admin') {
      return failure(taskError({
        code: 'InsufficientPrivileges',
        message: 'Insufficient privileges to delete a user.',
      }));
    }

    const user = await userRepository.findOne({realmId, id});
    if (!user) {
      return failure(taskError({
        code: 'UnknownUser',
        message: 'User does not exists.',
      }));
    }

    await Promise.all([
      userRepository.findOneAndDelete({realmId, id}),
      authRepository.deleteAllByUserId({realmId, userId: id}),
      subscriptionRepository.deleteAllByUserId({realmId, userId: id}),
    ]);

    return success(user);
  };
