const {success, failure} = require('../../lib/result');
const createTaskError = require('../../lib/error/task');

/**
 * Init list users task
 * @param {UserRepository} userRepository User repository
 * @param {RealmRepository} realmRepository Realm repository
 * @returns {Function} Task
 */
module.exports = ({userRepository, realmRepository}) =>
  /**
   * @function AdminTasks#listUsers
   * @param {{id: string}} account
   * @param {String} realmId RealmId
   * @param {number} offset Offset
   * @param {number} limit Limit
   * @returns {Result<PaginatedList<UserModel>>}
   */
  async ({account, realmId, offset, limit}) => {
    const realm = await realmRepository.findOne({ownerAccountId: account.id, id: realmId});
    if (!realm) {
      return failure(createTaskError({
        code: 'UnknownRealm',
        message: 'Cannot lookup the given realm.',
      }));
    }

    return success(await userRepository.find({realmId}, {offset, limit}));
  };
