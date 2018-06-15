const userModel = require('../../../../models/user');

const knownUserId = 'known-user-id';
const unknownUserId = 'unknown-user-id';
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
  knownUserId,
  unknownUserId,
  failingUserId,
  validUser,

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
};
