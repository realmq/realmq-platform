const realtimeConnectionModel = require('../../../../models/realtime-connection');
const {duplicate: duplicateError} = require('../../../../repositories/lib/error');
const authRepository = require('./auth');

const knownRealtimeConnectionId = 'known-realtime-connection-id';
const unknownRealtimeConnectionId = 'unknown-realtime-connection-id';
const knownRealmId = 'known-realm-id';
const unknownRealmId = 'unknown-realm-id';
const knownUserId = 'known-user-id';
const unknownUserId = 'unknown-user-id';
const knownClientId = `${authRepository.knownToken}:post-fix`;
const unknownClientId = `${authRepository.unknownToken}:post-fix`;
const duplicateClientId = `${authRepository.duplicateToken}:post-fix`;

const validRealtimeConnection = realtimeConnectionModel({
  id: knownRealtimeConnectionId,
  realmId: knownRealmId,
  userId: knownUserId,
  authId: authRepository.knownAuthId,
  clientId: knownClientId,
  createdAt: new Date(),
  updatedAt: new Date(),
});

module.exports = {
  knownRealtimeConnectionId,
  unknownRealtimeConnectionId,
  knownAuthId: authRepository.knownAuthId,
  unknownAuthId: authRepository.unknownAuthId,
  knownRealmId,
  unknownRealmId,
  knownUserId,
  unknownUserId,
  knownClientId,
  unknownClientId,
  duplicateClientId,
  validRealtimeConnection,

  async create({realmId, id, authId, clientId, userId}) {
    if (clientId === duplicateClientId) {
      throw duplicateError();
    }

    return realtimeConnectionModel({
      id: id || knownRealtimeConnectionId,
      realmId,
      userId,
      authId,
      clientId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  deleteAllByUserId() {},
  deleteAllByAuthId() {},
  findOneAndDeleteByClientId() {},
};
