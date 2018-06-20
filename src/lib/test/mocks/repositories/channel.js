const channelModel = require('../../../../models/channel');
const paginatedList = require('../../../../models/paginated-list');
const {duplicate: duplicateError} = require('../../../../repositories/lib/error');

const knownRealmId = 'known-realm-id';
const unknownRealmId = 'unknown-realm-id';
const knownChannelId = 'known-channel-id';
const unknownChannelId = 'unknown-channel-id';
const duplicateChannelId = 'duplicate-channel-id';

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
  duplicateChannelId,
  validChannel,

  async findByIds({realmId}) {
    if (realmId !== knownRealmId) {
      return [];
    }

    return paginatedList({items: [validChannel]});
  },

  async findOne({realmId, id}) {
    if (id && id !== knownChannelId) {
      return;
    }

    if (realmId && realmId !== knownRealmId) {
      return;
    }

    return validChannel;
  },

  async create({realmId, id, features, properties}) {
    if (id === duplicateChannelId) {
      throw duplicateError();
    }

    return channelModel({
      realmId,
      id: id || knownChannelId,
      features,
      properties,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  async findOrCreate({realmId, id, features, properties}) {
    return channelModel({
      id,
      realmId,
      features,
      properties,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  async find({realmId}, {offset, limit}) {
    if (realmId !== knownRealmId) {
      return paginatedList({offset, limit});
    }

    return paginatedList({items: [validChannel], offset, limit});
  },

  async findOneAndDelete() {},
};
