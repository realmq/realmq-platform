const initRewriteTopicToInternal = require('../../rules/rewrite-topic-to-internal');
const syncSubscriptionMessage = require('../../rules/sync-subscription-message');
const initSendSubscriptionCreatedSync = require('./send-subscription-created-sync');

/** @typedef {object} CommonTasks */

/**
 * Initialize common tasks
 * @param {MqttClient} mqttClient Mqtt client
 * @return {CommonTasks} Initialized tasks
 */
module.exports = ({mqttClient}) => {
  const rewriteTopicToInternal = initRewriteTopicToInternal();
  return {
    sendSubscriptionCreatedSync: initSendSubscriptionCreatedSync({
      mqttClient,
      syncSubscriptionMessage,
      rewriteTopicToInternal,
    }),
  };
};
