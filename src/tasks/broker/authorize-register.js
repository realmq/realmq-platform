/**
 * @param {BrokerTasks#authenticateClient} authenticateClient Task
 * @param {RealmLimitsRepository} realmLimitsRepository Realm limits repository
 * @returns {BrokerTasks#authorizeRegister} Task
 */
module.exports = ({authenticateClient, realmLimitsRepository}) =>
  /**
   * Authorize client connection
   * @typedef {Function} BrokerTasks#authorizeRegister
   * @param {string} clientId
   * @returns {Promise<{authorized: boolean, realmLimits?: RealmLimitsModel}>} authorization status
   */
  async clientId => {
    const client = await authenticateClient(clientId);
    if (!client || !client.authenticated) {
      return {authorized: false};
    }

    const realmLimits = await realmLimitsRepository.findOneByRealmId(client.realmId);
    return {
      authorized: true,
      realmLimits,
    }
  };
