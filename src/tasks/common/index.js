const initRewriteTopicToInternal = require('../../rules/rewrite-topic-to-internal');
const createSubscriptionSyncMessage = require('../../rules/subscription-sync-message');
const initSendSubscriptionSyncMessage = require('./send-subscription-sync-message');

/** @typedef {object} CommonTasks */

/**
 * Initialize common tasks
 * @param {MqttClient} mqttClient Mqtt client
 * @return {CommonTasks} Initialized tasks
 */
module.exports = ({mqttClient}) => {
  const rewriteTopicToInternal = initRewriteTopicToInternal();
  return {
    sendSubscriptionSyncMessage: initSendSubscriptionSyncMessage({
      mqttClient,
      createSubscriptionSyncMessage,
      rewriteTopicToInternal,
    }),
  };
};
