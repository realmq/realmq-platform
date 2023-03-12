/**
 * Generate the subscription sync message
 * @function Rules#generateSubscriptionSyncMessage
 * @param {SubscriptionModel} subscription The subscription
 * @param {string} action e.g. 'created', 'deleted' or 'updated'
 * @return {string} Message
 */
module.exports = ({subscription, action = 'updated'}) => JSON.stringify({
  event: `subscription-${action}`,
  ts: (new Date()).toISOString(),
  data: {
    id: subscription.id,
    userId: subscription.userId,
    channelId: subscription.channelId,
    allowRead: subscription.allowRead,
    allowWrite: subscription.allowWrite,
    createdAt: subscription.createdAt,
    updatedAt: subscription.updatedAt,
  },
});
