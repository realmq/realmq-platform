const {success} = require('../../lib/result');

/**
 * @param {RealmRepository} realmRepository Realm repository
 * @returns {function} Task
 */
module.exports = ({realmRepository}) =>
  /**
   * @typedef {Function} AdminTasks#fetchRealm
   * @param {{id: string}} account Account
   * @param {string} id Id of realm to fetch
   * @returns {Promise<Result<?RealmModel>>} Realm
   */
  async ({account, id}) =>
    success(await realmRepository.findOne({id, owningAccountId: account.id}));
