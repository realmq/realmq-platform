const {success} = require('../../lib/result');

/**
 * @param {RealmRepository} realmRepository Realm repository
 * @returns {AdminTasks#listRealms} Task
 */
module.exports = ({realmRepository}) =>
  /**
   * @typedef {Function} AdminTasks#listRealms
   * @param {object} args
   * @param {number} args.offset
   * @param {number} args.limit
   * @returns {Promise<PaginatedList>} Paginated list
   */
  async ({offset, limit}) =>
    success(await realmRepository.find({}, {offset, limit}));
