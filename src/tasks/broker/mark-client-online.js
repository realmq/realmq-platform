/**
 * @param {AuthRepository} authRepository Auth repository
 * @returns {BrokerTasks#markClientOnline} Task
 */
module.exports = ({authRepository}) =>
  /**
   * @typedef {Function} BrokerTasks#markClientOnline
   * @param {string} clientId
   * @return {Promise<void>}
   */
  async clientId => {
    const auth = await authRepository.findOneByToken(clientId);
    if (!auth) {
      return;
    }

    auth.isOnline = true;
    await authRepository.update(auth);
  };
