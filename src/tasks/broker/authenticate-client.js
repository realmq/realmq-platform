const {extractTokenFromClientId} = require('../../rules/parse-client-id');

/**
 * @typedef {object} BrokerClient
 * @prop {string} id
 * @prop {boolean} authenticated
 * @prop {string} [realmId]
 * @prop {string} [authTokenId]
 * @prop {string} [userId]
 * @prop {string} [scope]
 */
/**
 * @param {AuthRepository} authRepository Auth repository
 * @returns {BrokerTasks#authenticateClient} Task
 */
module.exports = ({authRepository}) =>
  /**
   * @typedef {Function} BrokerTasks#authenticateClient
   * @param {string} clientId
   * @return {Promise<BrokerClient>}
   */
  async clientId => {
    const client = {
      id: clientId,
      authenticated: false,
    };

    // Parse the actual token from clientId
    const token = extractTokenFromClientId(clientId);

    const auth = await authRepository.findOneByToken(token);
    if (auth) {
      Object.assign(client, {
        authenticated: true,
        realmId: auth.realmId,
        authTokenId: auth.id,
        userId: auth.userId,
        scope: auth.scope,
      });
    }

    return client;
  };
