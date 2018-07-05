const {success, failure} = require('../../lib/result');
/**
 * @param {MqttClient} mqttClient Mqtt client
 * @param {rewriteTopicToInternalRule} rewriteTopicToInternal Topic rewrite rule
 * @param {syncSubscriptionMessageRule} createSyncSubscriptionMessage Message creation rule
 * @returns {CommonTasks#sendSubscriptionSync} Task
 */
module.exports = ({
  mqttClient,
  rewriteTopicToInternal,
  createSyncSubscriptionMessage,
}) => {
  /**
   * Promisified MQTT publish
   * @param {string} topic Topic
   * @param {string} message Message
   * @return {Promise<void>} Promise
   */
  const publishMessage = (topic, message) => new Promise((resolve, reject) => {
    mqttClient.publish(topic, message, err => (err ? reject(err) : resolve()));
  });

  /**
   * @function CommonTasks#sendSubscriptionSync
   * @param {SubscriptionModel} subscription Subscription
   * @param {string} action Subscription sync action
   * @return {Promise<*>} Promise
   */
  return async ({subscription, action}) => {
    if (!subscription) {
      return failure(new Error('Missing subscription'));
    }

    if (!action) {
      return failure(new Error('Missing action'));
    }

    const {realmId, userId} = subscription;
    if (!realmId || !userId) {
      return failure(new Error('Invalid subscription'));
    }

    const topic = rewriteTopicToInternal({
      topic: '$RMQ/sync/my/subscriptions',
      client: {realmId, userId},
    });

    const message = createSyncSubscriptionMessage({subscription, action});

    try {
      await publishMessage(topic, message);
      return success(null);
    } catch (e) {
      return failure(e);
    }
  };
};
