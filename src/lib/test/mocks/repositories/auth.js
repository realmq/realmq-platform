const authModel = require('../../../../models/auth');
const paginatedList = require('../../../../models/paginated-list');
const {duplicate: duplicateError} = require('../../../../repositories/lib/error');

const knownAuthId = 'known-auth-id';
const unknownAuthId = 'unknown-auth-id';
const knownRealmId = 'known-realm-id';
const unknownRealmId = 'unknown-realm-id';
const knownUserId = 'known-user-id';
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
  unknownAuthId,
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
      id: id || knownAuthId,
      realmId,
      userId,
      scope,
      description,
      token,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  async find({realmId}, {offset, limit}) {
    if (realmId !== knownRealmId) {
      return paginatedList({offset, limit});
    }

    return paginatedList({items: [validAuth], limit, offset});
  },

  async findOneByToken(token) {
    if (token === knownToken) {
      return validAuth;
    }
  },

  async findOne({id}) {
    if (id === knownAuthId) {
      return validAuth;
    }
  },

  async update(auth, properties) {
    return {
      ...auth,
      ...properties,
    };
  },

  async findOneAndDelete() {},
  async deleteAllByUserId() {},
};
