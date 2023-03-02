const {parseTokenFromClientId} = require('../../rules/parse-client-id');

/**
 * @param {AuthRepository} authRepository Auth repository
 * @param {RealtimeConnectionRepository} realtimeConnectionRepository Realtime connection repository
 * @param {UserRepository} userRepository User repository
 * @returns {BrokerTasks#markClientOnline} Task
 */
module.exports = ({
  authRepository,
  realtimeConnectionRepository,
  userRepository
}) =>
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
        authId: auth.id,
        clientId
      });

      // set auth token and user online if token was previously offline
      if (!auth.isOnline) {
        await Promise.all([
          authRepository.setIsOnline({realmId: auth.realmId, id: auth.id, isOnline: true}),
          userRepository.setIsOnline({realmId: auth.realmId, id: auth.userId, isOnline: true})
        ]);
      }
    } catch (error) {
      // ignore cases where we already have a connection for the given clientId
      if (!error.isDuplicateKeyError) {
        throw error;
      }
    }
  };
