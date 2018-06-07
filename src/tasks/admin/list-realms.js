const {success} = require('../../lib/result');

/**
 *
 * @param {RealmRepository} realmRepository Realm repository
 * @returns {AdminTasks#listRealms} Task
 */
module.exports = ({realmRepository}) =>
  /**
   * @typedef {Function} AdminTasks#listRealms
   * @param account
   * @param offset
   * @param limit
   * @returns {Promise<PaginatedList>}
   */
  async (account, offset, limit) =>
    success(await realmRepository.find({owningAccountId: account.id}, {offset, limit}));
