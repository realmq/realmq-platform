const {success, failure} = require('../../lib/result');
const taskError = require('../../lib/error/task');
const createTaskError = require('../../lib/error/task');

/**
 * Init delete user task.
 * @param {RealmRepository} realmRepository Realm repository
 * @param {UserRepository} userRepository The user repository
 * @param {AuthRepository} authRepository The auth repository
 * @param {RealtimeConnectionRepository} realtimeConnectionRepository The realtime connection repository
 * @param {SubscriptionRepository} subscriptionRepository The subscription repository
 * @returns {ClientTasks#deleteUser} Task
 */
module.exports = ({
  realmRepository,
  userRepository,
  authRepository,
  subscriptionRepository,
  realtimeConnectionRepository,
}) =>
  /**
   * Delete a user and its auth tokens and subscriptions.
   * @function AdminTasks#deleteUser
   * @param {string} realmId Realm id
   * @param {string} id User id
   * @returns {Result<UserModel>}
   */
  async ({realmId, id}) => {
    const realm = await realmRepository.findOne({id: realmId});
    if (!realm) {
      return failure(createTaskError({
        code: 'UnknownRealm',
        message: 'Cannot lookup the given realm.',
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
      userRepository.deleteOne({realmId, id}),
      authRepository.deleteAllByUserId({realmId, userId: id}),
      subscriptionRepository.deleteAllByUserId({realmId, userId: id}),
      realtimeConnectionRepository.deleteAllByUserId({realmId, userId: id}),
    ]);

    return success(user);
  };
