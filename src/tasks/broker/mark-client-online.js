/**
 * @param {function} loadAuth Dependency
 * @param {function} updateAuth Dependency
 * @returns {BrokerTasks#markClientOnline} Task
 */
module.exports = ({loadAuth, updateAuth}) =>
  /**
   * @typedef {Function} BrokerTasks#markClientOnline
   * @param {string} clientId
   * @return {Promise<void>}
   */
  async clientId => {
    const auth = await loadAuth(clientId);
    if (!auth) {
      return;
    }
    auth.isOnline = true;
    await updateAuth(auth);
  };
