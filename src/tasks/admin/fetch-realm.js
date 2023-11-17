const {success} = require('../../lib/result');

/**
 * @param {RealmRepository} realmRepository Realm repository
 * @param {RealmLimitsRepository} realmLimitsRepository Realm limits repository
 * @returns {AdminTasks#fetchRealm} Task
 */
module.exports = ({realmRepository, realmLimitsRepository}) =>
  /**
   * @typedef {Function} AdminTasks#fetchRealm
   * @param {object} args
   * @param {string} args.id Id of realm to fetch
   * @returns {Promise<Result<{realm?: RealmModel, realmLimits?: RealmLimitsModel}>>} Realm
   */
  async ({id}) => {
    const [realm, realmLimits] = await Promise.all([
      realmRepository.findOne({id}),
      realmLimitsRepository.findOneByRealmId(id),
    ]);
    return success({realm, realmLimits});
  };
