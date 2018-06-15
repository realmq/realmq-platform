const subscriptionModel = require('../../../../models/subscription');

const knownSubscriptionId = 'subscription-id';
const unknownSubscriptionId = 'unknown-subscription-id';
const knownRealmId = 'realm-id';
const unknownRealmId = 'unknown-realm-id';
const knownChannelId = 'channel-id';
const unknownChannelId = 'unknown-channel-id';
const knownUserId = 'user-id';
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
  unknownRealmId,
  unknownUserId,
  unknownSubscriptionId,
  validSubscription,

  async findOneByChannelAndUserId({realmId, channelId, userId}) {
    if (realmId === knownRealmId && channelId === knownChannelId && userId === knownUserId) {
      return validSubscription;
    }
  },
};
