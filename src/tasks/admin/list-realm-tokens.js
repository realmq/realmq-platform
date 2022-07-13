const {success, failure} = require('../../lib/result');
const createTaskError = require('../../lib/error/task');

/**
 * @param {RealmRepository} realmRepository The realmRespository
 * @param {AuthRepository} authRepository Auth repository
 * @returns {AdminTasks#listRealmTokens} Task
 */
module.exports = ({realmRepository, authRepository}) =>
  /**
   * @function AdminTasks#listRealmTokens
   * @param {object} args
   * @param {number} args.realmId
   * @param {number} args.offset
   * @param {number} args.limit
   * @return {Promise<PaginatedList<AuthModel>>} Paginated list
   */
  async ({realmId, offset, limit}) => {
    const realm = await realmRepository.findOne({id: realmId});
    if (!realm) {
      return failure(createTaskError({
        code: 'UnknownRealm',
        message: 'Cannot lookup the given realm.',
      }));
    }

    return success(await authRepository.find({realmId}, {offset, limit}));
  };
