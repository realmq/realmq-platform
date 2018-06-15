const channelModel = require('../../../../models/channel');

const knownRealmId = 'realm-id';
const unknownRealmId = 'unknown-realm-id';
const knownChannelId = 'channel-id';
const unknownChannelId = 'unknown-channel-id';

const validChannel = channelModel({
  id: knownChannelId,
  realmId: knownRealmId,
  features: {},
  properties: {},
  createdAt: new Date(),
  updatedAt: new Date(),
});

module.exports = {
  knownRealmId,
  knownChannelId,
  unknownRealmId,
  unknownChannelId,
  validChannel,

  async findOne({realmId, id}) {
    if (realmId === knownRealmId && id === knownChannelId) {
      return validChannel;
    }
  },
};
