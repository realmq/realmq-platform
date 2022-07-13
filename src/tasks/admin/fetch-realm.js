const {success} = require('../../lib/result');

/**
 * @param {RealmRepository} realmRepository Realm repository
 * @returns {AdminTasks#fetchRealm} Task
 */
module.exports = ({realmRepository}) =>
  /**
   * @typedef {Function} AdminTasks#fetchRealm
   * @param {object} args
   * @param {string} args.id Id of realm to fetch
   * @returns {Promise<Result<?RealmModel>>} Realm
   */
  async ({id}) =>
    success(await realmRepository.findOne({id}));
