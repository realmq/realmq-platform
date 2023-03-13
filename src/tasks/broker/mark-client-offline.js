/**
 * @param {RealtimeConnectionRepository} realtimeConnectionRepository Realtime connection repository
 * @param {AuthRepository} authRepository Auth repository
 * @param {UserRepository} userRepository User repository
 * @returns {BrokerTasks#markClientOffline} Task
 */
module.exports = ({
  authRepository,
  realtimeConnectionRepository,
  userRepository,
}) =>
  /**
   * @typedef {Function} BrokerTasks#markClientOffline
   * @param {string} clientId
   * @return {Promise<void>}
   */
  async clientId => {
    const realtimeConnection = await realtimeConnectionRepository.findOneAndDeleteByClientId(clientId);

    if (realtimeConnection) {
      const [connectionsByUser, connectionsByAuth] = await Promise.all([
        realtimeConnectionRepository.countByUserId({
          realmId: realtimeConnection.realmId,
          userId: realtimeConnection.userId,
        }),
        realtimeConnectionRepository.countByAuthId({
          realmId: realtimeConnection.realmId,
          authId: realtimeConnection.authId,
        }),
      ]);

      await Promise.all([
        connectionsByUser === 0 ? userRepository.setIsOnline({
          realmId: realtimeConnection.realmId,
          id: realtimeConnection.userId,
          isOnline: false,
        }) : null,
        connectionsByAuth === 0 ? authRepository.setIsOnline({
          realmId: realtimeConnection.realmId,
          id: realtimeConnection.authId,
          isOnline: false,
        }) : null,
      ]);
    }
  };
