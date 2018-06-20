const realmModel = require('../../../../models/realm');

const knownRealmId = 'known-realm-id';
const unknownRealmId = 'unknown-realm-id';
const knownAccountId = 'known-account-id';
const unknownAccountId = 'unknown-accountId';

const validRealm = realmModel({
  id: knownRealmId,
  name: 'test-realm',
  ownerAccountId: knownAccountId,
  createdAt: new Date(),
  updatedAt: new Date(),
});

module.exports = {
  knownRealmId,
  unknownRealmId,
  knownAccountId,
  unknownAccountId,
  validRealm,

  findOne({ownerAccountId, id}) {
    if (id && id !== knownRealmId) {
      return;
    }

    if (ownerAccountId && ownerAccountId !== knownAccountId) {
      return;
    }

    return validRealm;
  },
};
