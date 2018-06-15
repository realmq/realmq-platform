const authModel = require('../../../../models/auth');
const {duplicate: duplicateError} = require('../../../../repositories/lib/error');

const knownAuthId = 'auth-id';
const unKnownAuthId = 'unknown-auth-id';
const knownRealmId = 'realm-id';
const unknownRealmId = 'unknown-realm-id';
const knownUserId = 'user-id';
const unknownUserId = 'unknown-user-id';
const knownToken = Buffer.from('token').toString('base64');
const unknownToken = Buffer.from('unknown-token').toString('base64');
const duplicateToken = Buffer.from('duplicate-token').toString('base64');

const validAuth = authModel({
  id: knownAuthId,
  realmId: knownRealmId,
  userId: knownUserId,
  isOnline: false,
  scope: 'user',
  token: knownToken,
  description: 'test token',
  createdAt: new Date(),
  updatedAt: new Date(),
});

module.exports = {
  knownAuthId,
  unKnownAuthId,
  knownRealmId,
  unknownRealmId,
  knownUserId,
  unknownUserId,
  knownToken,
  unknownToken,
  duplicateToken,
  validAuth,

  async create({realmId, id, token, userId, scope, description}) {
    if (token === duplicateToken) {
      throw duplicateError();
    }

    return authModel({
      id,
      realmId,
      userId,
      scope,
      description,
      token,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  async find({realmId}) {
    if (realmId === knownRealmId) {
      return [validAuth];
    }

    return [];
  },
};
