const {success} = require('../../lib/result');

/**
 * @param {RealmRepository} realmRepository Realm repository
 * @returns {AdminTasks#listRealms} Task
 */
module.exports = ({realmRepository}) =>
  /**
   * @typedef {Function} AdminTasks#listRealms
   * @param {{id: string}} account
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<PaginatedList>} Paginated list
   */
  async ({account, offset, limit}) =>
    success(await realmRepository.find({ownerAccountId: account.id}, {offset, limit}));
