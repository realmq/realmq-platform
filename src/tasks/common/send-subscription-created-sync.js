/**
 * @param {MqttClient} mqttClient Mqtt client
 * @param {rewriteTopicToInternalRule} rewriteTopicToInternal Topic rewrite rule
 * @param {Function} generateSubscriptionCreatedMessage Message rule
 * @returns {CommonTasks#sendSubscriptionCreatedSync} Task
 */
module.exports = ({
  mqttClient,
  rewriteTopicToInternal,
  syncSubscriptionMessage: {
    generateSubscriptionCreatedMessage,
  },
}) =>
  /**
   * @function CommonTasks#sendSubscriptionCreatedSync
   * @param {SubscriptionModel} subscription Subscription
   */
  (subscription = {}) => {
    if (!subscription) {
      return;
    }

    const {realmId, userId} = subscription;
    if (!realmId || !userId) {
      return;
    }

    const topic = rewriteTopicToInternal({
      topic: '$RMQ/sync/my/subscriptions',
      client: {realmId, userId},
    });

    const message = generateSubscriptionCreatedMessage(subscription);

    mqttClient.publish(topic, message);
  };
