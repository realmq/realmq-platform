const {success, failure} = require('../../lib/result');
const createTaskError = require('../../lib/error/task');

/**
 * @param {RealmRepository} realmRepository The realm repository
 * @param {UserRepository} userRepository User repository
 * @returns {AdminTasks#listUsers} Task
 */
module.exports = ({realmRepository, userRepository}) =>
  /**
   * @function AdminTasks#listUsers
   * @param {object} args
   * @param {number} args.realmId
   * @param {number} args.offset
   * @param {number} args.limit
   * @return {Promise<PaginatedList<UserModel>>} Paginated list
   */
  async ({realmId, offset, limit}) => {
    const realm = await realmRepository.findOne({id: realmId});
    if (!realm) {
      return failure(createTaskError({
        code: 'UnknownRealm',
        message: 'Cannot lookup the given realm.',
      }));
    }

    return success(await userRepository.find({realmId}, {offset, limit}));
  };
