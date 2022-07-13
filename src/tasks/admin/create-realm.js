const {success} = require('../../lib/result');

/**
 * @param {RealmRepository} realmRepository The realm repository
 * @returns {AdminTasks#createRealm} Task
 */
module.exports = ({realmRepository}) =>
  /**
   * @typedef {Function} AdminTasks#createRealm
   * @param {object} args
   * @param {string} args.name The name of the realm
   * @return {Promise<Result<?RealmModel>>} Realm
   */
  async ({name}) =>
    success(await realmRepository.create({name}));
