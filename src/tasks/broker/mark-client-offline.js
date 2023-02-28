/**
 * @param {RealtimeConnectionRepository} realtimeConnectionRepository Realtime connection repository
 * @returns {BrokerTasks#markClientOffline} Task
 */
module.exports = ({realtimeConnectionRepository}) =>
  /**
   * @typedef {Function} BrokerTasks#markClientOffline
   * @param {string} clientId
   * @return {Promise<void>}
   */
  async clientId => {
    await realtimeConnectionRepository.deleteOneByClientId(clientId);
  };
