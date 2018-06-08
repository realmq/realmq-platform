const {success, failure} = require('../../lib/result');
const createTaskError = require('../../lib/error/task');

/**
 * @param {AdminTasks#fetchRealm} fetchRealm Task
 * @param {AuthRepository} authRepository Auth repository
 * @returns {AdminTasks#listRealmTokens} Task
 */
module.exports = ({fetchRealm, authRepository}) =>
  /**
   * @function AdminTasks#listRealmTokens
   * @param {{id: string}} account
   * @param {number} realmId
   * @param {number} offset
   * @param {number} limit
   * @return {Promise<PaginatedList<AuthModel>>} Paginated list
   */
  async ({account, realmId, offset, limit}) => {
    const {ok: fetchRealmOk, result: realm} = await fetchRealm({account, id: realmId});
    if (!fetchRealmOk || !realm) {
      return failure(createTaskError(
        'MissingAccessRights',
        'Missing access rights to access this realm.'
      ));
    }

    return success(await authRepository.find({realmId}, {offset, limit}));
  };
