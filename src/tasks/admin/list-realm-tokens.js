const {success, failure} = require('../../lib/result');
const createTaskError = require('../../lib/error/task');

/**
 * @param {RealmRepository} realmRepository The realm repository
 * @param {AuthRepository} authRepository Auth repository
 * @returns {AdminTasks#listRealmTokens} Task
 */
module.exports = ({realmRepository, authRepository}) =>
  /**
   * @function AdminTasks#listRealmTokens
   * @param {{id: string}} account
   * @param {number} realmId
   * @param {number} offset
   * @param {number} limit
   * @return {Promise<PaginatedList<AuthModel>>} Paginated list
   */
  async ({account, realmId, offset, limit}) => {
    const realm = await realmRepository.findOne({ownerAccountId: account.id, id: realmId});
    if (!realm) {
      return failure(createTaskError({
        code: 'UnknownRealm',
        message: 'Cannot lookup the given realm.',
      }));
    }

    return success(await authRepository.find({realmId}, {offset, limit}));
  };
