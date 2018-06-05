/**
 * @param {function} loadAuth Dependency
 * @param {function} updateAuth Dependency
 * @returns {BrokerTasks#markClientOffline} Task
 */
module.exports = ({loadAuth, updateAuth}) =>
  /**
   * @typedef {Function} BrokerTasks#markClientOffline
   * @param {string} clientId
   * @return {Promise<void>}
   */
  async clientId => {
    const auth = await loadAuth(clientId);
    if (!auth) {
      return;
    }
    auth.isOnline = false;
    await updateAuth(auth);
  };
