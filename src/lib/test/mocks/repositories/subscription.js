const subscriptionModel = require('../../../../models/subscription');
const paginatedList = require('../../../../models/paginated-list');
const {duplicate: duplicateError} = require('../../../../repositories/lib/error');

const knownSubscriptionId = 'known-subscription-id';
const unknownSubscriptionId = 'unknown-subscription-id';
const duplicateSubscriptionId = 'duplicate-subscription-id';
const knownRealmId = 'known-realm-id';
const unknownRealmId = 'unknown-realm-id';
const knownChannelId = 'known-channel-id';
const unknownChannelId = 'unknown-channel-id';
const knownUserId = 'known-user-id';
const unknownUserId = 'unknown-user-id';

const validSubscription = subscriptionModel({
  id: knownSubscriptionId,
  realmId: knownRealmId,
  userId: knownUserId,
  channelId: knownChannelId,
  allowRead: true,
  allowWrite: false,
  updatedAt: new Date(),
  createdAt: new Date(),
});

module.exports = {
  knownUserId,
  knownChannelId,
  knownRealmId,
  knownSubscriptionId,
  unknownChannelId,
  duplicateSubscriptionId,
  unknownRealmId,
  unknownUserId,
  unknownSubscriptionId,
  validSubscription,

  async findOneByChannelAndUserId({realmId, channelId, userId}) {
    if (realmId === knownRealmId && channelId === knownChannelId && userId === knownUserId) {
      return validSubscription;
    }
  },

  async create({id, realmId, userId, channelId, allowRead = false, allowWrite = false}) {
    if (id === duplicateSubscriptionId) {
      throw duplicateError();
    }

    return subscriptionModel({
      id: id || knownSubscriptionId,
      realmId,
      userId,
      channelId,
      allowRead,
      allowWrite,
      updatedAt: new Date(),
      createdAt: new Date(),
    });
  },

  async findOne({id, channelId, userId}) {
    if (id && id !== knownSubscriptionId) {
      return;
    }

    if (channelId && channelId !== knownChannelId) {
      return;
    }

    if (userId && userId !== knownUserId) {
      return;
    }

    return validSubscription;
  },

  async find({realmId, userId}, {offset, limit}) {
    if (realmId && realmId !== knownRealmId) {
      return paginatedList({offset, limit});
    }

    if (userId && userId !== knownUserId) {
      return paginatedList({offset, limit});
    }

    return paginatedList({items: [validSubscription], offset, limit});
  },

  async findOneAndDelete() {},
  async deleteAllByUserId() {},
};
