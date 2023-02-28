const {parseTokenFromClientId} = require('../../rules/parse-client-id');

/**
 * @param {AuthRepository} authRepository Auth repository
 * @param {RealtimeConnectionRepository} realtimeConnectionRepository Realtime connection repository
 * @returns {BrokerTasks#markClientOnline} Task
 */
module.exports = ({authRepository, realtimeConnectionRepository}) =>
  /**
   * @typedef {Function} BrokerTasks#markClientOnline
   * @param {string} clientId
   * @return {Promise<void>}
   */
  async clientId => {
    const token = parseTokenFromClientId(clientId)
    const auth = await authRepository.findOneByToken(token);
    if (!auth) {
      return;
    }

    try {
      await realtimeConnectionRepository.create({
        realmId: auth.realmId,
        userId: auth.userId,
        tokenId: auth.id,
        clientId
      });
    } catch (error) {
      // ignore cases where we already have a connection for the given clientId
      if (!error.isDuplicateKeyError) {
        throw error;
      }
    }
  };
