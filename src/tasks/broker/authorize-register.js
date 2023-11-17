/**
 * @param {BrokerTasks#authenticateClient} authenticateClient Task
 * @param {RealmLimitsRepository} realmLimitsRepository Realm limits repository
 * @param {RealtimeConnectionRepository} realtimeConnectionRepository Realtime connection repository
 * @returns {BrokerTasks#authorizeRegister} Task
 */
module.exports = ({
  authenticateClient,
  realmLimitsRepository,
  realtimeConnectionRepository,
}) =>
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

    const [realmLimits, numberOfRealmConnections] = await Promise.all([
      realmLimitsRepository.findOneByRealmId(client.realmId),
      realtimeConnectionRepository.countByRealmId(client.realmId),
    ]);

    if (
      realmLimits
      && Number.isFinite(realmLimits.maxConnections)
      && realmLimits.maxConnections > 0
      && realmLimits.maxConnections <= numberOfRealmConnections
    ) {
      return {authorized: false};
    }

    return {
      authorized: true,
      realmLimits,
    };
  };
