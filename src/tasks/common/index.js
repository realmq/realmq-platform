const initRewriteTopicToInternal = require('../../rules/rewrite-topic-to-internal');
const createSubscriptionSyncMessage = require('../../rules/subscription-sync-message');
const initSendSubscriptionSync = require('./send-subscription-sync');

/** @typedef {object} CommonTasks */

/**
 * Initialize common tasks
 * @param {MqttClient} mqttClient Mqtt client
 * @return {CommonTasks} Initialized tasks
 */
module.exports = ({mqttClient}) => {
  const rewriteTopicToInternal = initRewriteTopicToInternal();
  return {
    sendSubscriptionSync: initSendSubscriptionSync({
      mqttClient,
      createSubscriptionSyncMessage,
      rewriteTopicToInternal,
    }),
  };
};
