/**
 * @param {BrokerTasks#authenticateClient} authenticateClient Task
 * @returns {BrokerTasks#authorizeRegister} Task
 */
module.exports = ({authenticateClient}) =>
  /**
   * Authorize client connection
   * @typedef {Function} BrokerTasks#authorizeRegister
   * @param {string} clientId
   * @returns {Promise<boolean>} authorization status
   */
  async clientId => {
    const client = await authenticateClient(clientId);
    return (client || {}).authenticated === true;
  };
