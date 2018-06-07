/**
 * @param {AuthRepository} authRepository Auth repository
 * @returns {BrokerTasks#markClientOffline} Task
 */
module.exports = ({authRepository}) =>
  /**
   * @typedef {Function} BrokerTasks#markClientOffline
   * @param {string} clientId
   * @return {Promise<void>}
   */
  async clientId => {
    const auth = await authRepository.findOneByToken(clientId);
    if (!auth) {
      return;
    }
    auth.isOnline = false;
    await authRepository.update(auth);
  };
