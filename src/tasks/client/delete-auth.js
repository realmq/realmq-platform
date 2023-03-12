const {success, failure} = require('../../lib/result');
const {
  insufficientPrivileges: errorInsufficientPrivileges,
  unknown: unknownAuthError,
} = require('./auth/errors');
const createLookupQuery = require('./auth/create-lookup-query');

/**
 * Init delete auth task
 * @param {AuthRepository} authRepository Auth repository
 * @param {RealtimeConnectionRepository} realtimeConnectionRepository Realtime connection repository
 * @returns {ClientTasks#deleteAuth} Delete auth task
 */
module.exports = ({authRepository, realtimeConnectionRepository}) =>
  /**
   * @function ClientTasks#deleteAuth
   * @param {AuthModel} authToken Authentication
   * @param {string} id Id of auth token to delete
   * @returns {Result<AuthModel>} Deleted auth
   */
  async ({authToken, id}) => {
    const {scope, realmId, userId} = authToken;

    if (scope !== 'admin') {
      return failure(errorInsufficientPrivileges({
        action: 'delete an auth token',
      }));
    }

    const query = createLookupQuery({scope, realmId, id, userId});
    const authToDelete = await authRepository.findOne(query);

    if (!authToDelete) {
      return failure(unknownAuthError());
    }

    await Promise.all([
      authRepository.deleteOne(query),
      realtimeConnectionRepository.deleteAllByAuthId({
        realmId,
        authId: id,
      }),
    ]);

    return success(authToDelete);
  };
