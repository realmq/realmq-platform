const {success, failure} = require('../../lib/result');
const createTaskError = require('../../lib/error/task');

/**
 * Init delete auth task
 * @param {AuthRepository} authRepository Auth repository
 * @param {RealmRepository} realmRepository Realm repository
 * @param {RealtimeConnectionRepository} realtimeConnectionRepository Realtime connection repository
 * @returns {ClientTasks#deleteAuth} Delete auth task
 */
module.exports = ({authRepository, realmRepository, realtimeConnectionRepository}) =>
  /**
   * @function AdminTasks#deleteToken
   * @param {string} realmId Id of the realm
   * @param {string} id Id of auth token to delete
   * @returns {Result<AuthModel>} Deleted auth
   */
  async ({realmId, id}) => {
    const realm = await realmRepository.findOne({id: realmId});
    if (!realm) {
      return failure(createTaskError({
        code: 'UnknownRealm',
        message: 'Cannot lookup the given realm.',
      }));
    }

    const authToDelete = await authRepository.findOne({realmId, id});

    if (!authToDelete) {
      return failure(createTaskError({
        code: 'UnknownAuthToken',
        message: 'Auth token does not exists.',
      }));
    }

    await Promise.all([
      authRepository.deleteOne({realmId, id}),
      realtimeConnectionRepository.deleteAllByAuthId({
        realmId,
        authId: id,
      }),
    ]);

    return success(authToDelete);
  };
