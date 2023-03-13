const generateSubscriptionSyncMessage = require('../../rules/generate-subscription-sync-message');
const initSendSubscriptionSyncMessage = require('./send-subscription-sync-message');

/** @typedef {object} CommonTasks */

/**
 * Initialize common tasks
 * @param {MqttClient} mqttClient Mqtt client
 * @param {Rules#rewriteTopicToInternal} rewriteTopicToInternal Topic rewrite rule
 * @return {CommonTasks} Initialized tasks
 */
module.exports = ({mqttClient, rewriteTopicToInternal}) => ({
  sendSubscriptionSyncMessage: initSendSubscriptionSyncMessage({
    mqttClient,
    generateSubscriptionSyncMessage,
    rewriteTopicToInternal,
  }),
});
