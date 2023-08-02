const {success} = require('../../lib/result');

/**
 * @param {RealmRepository} realmRepository The realm repository
 * @param {RealmLimitsRepository} realmLimitsRepository The realm repository
 * @returns {AdminTasks#createRealm} Task
 */
module.exports = ({realmRepository, realmLimitsRepository}) =>
  /**
   * @typedef {Function} AdminTasks#createRealm
   * @param {object} args
   * @param {string} args.name The name of the realm
   * @param {object} [args.limits] The limit settings of the realm
   * @param {number} [args.limits] The limit settings of the realm
   * @return {Promise<Result<{realm: RealmModel, realmLimits: RealmLimitsModel}>>} Realm
   */
  async ({name, limits}) => {
    const realm = await realmRepository.create({name});
    const realmLimits = await realmLimitsRepository.create({realmId: realm.id, ...limits});
    return success({realm, realmLimits});
  };
