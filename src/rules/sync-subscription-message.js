/**
 * Generate the subscription sync message
 * @param {SubscriptionModel} subscription The subscription
 * @param {string} action e.g. 'created', 'deleted' or 'updated'
 * @return {string} Message
 */
const generateMessage = (subscription, action = 'updated') => {
  return JSON.stringify({
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
};

module.exports = {
  generateSubscriptionCreatedMessage(subscription) {
    return generateMessage(subscription, 'created');
  },

  generateSubscriptionDeletedMessage(subscription) {
    return generateMessage(subscription, 'deleted');
  },

  generateSubscriptionUpdatedMessage(subscription) {
    return generateMessage(subscription, 'updated');
  },
};
