const realmModel = require('../../../../models/realm');

const knownRealmId = 'known-realm-id';
const unknownRealmId = 'unknown-realm-id';

const validRealm = realmModel({
  id: knownRealmId,
  name: 'test-realm',
  createdAt: new Date(),
  updatedAt: new Date(),
});

module.exports = {
  knownRealmId,
  unknownRealmId,
  validRealm,

  findOne({id}) {
    if (id && id !== knownRealmId) {
      return;
    }

    return validRealm;
  },
};
