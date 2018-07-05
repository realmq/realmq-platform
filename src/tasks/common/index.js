const initRewriteTopicToInternal = require('../../rules/rewrite-topic-to-internal');
const generateSubscriptionSyncMessage = require('../../rules/generate-subscription-sync-message');
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
      generateSubscriptionSyncMessage,
      rewriteTopicToInternal,
    }),
  };
};
