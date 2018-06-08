const {success} = require('../../lib/result');

/**
 * @param {RealmRepository} realmRepository The realm repository
 * @returns {AdminTasks#createRealm} Task
 */
module.exports = ({realmRepository}) =>
  /**
   * @typedef {Function} AdminTasks#createRealm
   * @param {{id: string}} account Account
   * @param {string} name The name of the realm
   * @return {Promise<Result<?RealmModel>>} Realm
   */
  async ({account, name}) =>
    success(await realmRepository.create({name, ownerAccountId: account.id}));
