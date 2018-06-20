const userModel = require('../../../../models/user');
const paginatedList = require('../../../../models/paginated-list');
const {duplicate: duplicateError} = require('../../../../repositories/lib/error');

const knownUserId = 'known-user-id';
const unknownUserId = 'unknown-user-id';
const duplicateUserId = 'duplicate-user-id';
const failingUserId = 'failing-user-id';
const knownRealmId = 'known-realm-id';
const unknownRealmId = 'unknown-realm-id';

const validUser = userModel({
  id: knownUserId,
  realmId: knownRealmId,
  isOnline: false,
  createdAt: new Date(),
  updatedAt: new Date(),
});

module.exports = {
  knownRealmId,
  unknownRealmId,
  duplicateUserId,
  knownUserId,
  unknownUserId,
  failingUserId,
  validUser,

  async find({realmId}, {offset, limit}) {
    if (realmId && realmId !== knownRealmId) {
      return paginatedList({offset, limit});
    }

    return paginatedList({items: [validUser], offset, limit});
  },

  async findOrCreate({realmId, id}) {
    if (id === failingUserId) {
      return null;
    }

    return userModel({
      id,
      realmId,
      isOnline: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  async findOne({id, realmId}) {
    if (id && id !== knownUserId) {
      return;
    }

    if (realmId && realmId !== knownRealmId) {
      return;
    }

    return validUser;
  },

  async create({id, realmId, isOnline = false}) {
    if (id === duplicateUserId) {
      throw duplicateError();
    }

    return userModel({
      id,
      realmId,
      isOnline,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  async findOneAndDelete() {},
};
