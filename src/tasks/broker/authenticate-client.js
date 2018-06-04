/**
 * @typedef {object} BrokerClient
 * @prop {string} clientId
 * @prop {boolean} authenticated
 * @prop {string} [realmId]
 * @prop {string} [authTokenId]
 * @prop {string} [userId]
 * @prop {string} [scope]
 */
/**
 * @param {function(token: string): ?object} loadAuth Dependency
 * @returns {BrokerTasks#authenticateClient} Task
 */
module.exports = ({loadAuth}) =>
  /**
   * @typedef {Function} BrokerTasks#authenticateClient
   * @param {string} clientId
   * @return {Promise<BrokerClient>}
   */
  async clientId => {
    const client = {
      clientId,
      authenticated: false
    };

    const auth = await loadAuth(clientId);
    if (auth) {
      Object.assign(client, {
        authenticated: true,
        realmId: auth.realmId,
        authTokenId: auth.id,
        userId: auth.userId,
        scope: auth.scope
      });
    }

    return client;
  };
