const initAuthOnPublish = require('./auth-on-publish');
const initAuthOnRegister = require('./auth-on-register');
const initAuthOnSubscribe = require('./auth-on-subscribe');
const initOnClientOffline = require('./on-client-offline');
const initOnClientOnline = require('./on-client-online');

/**
 * @typedef {object} BrokerV1VmqRoutes
 */
/**
 * @param {BrokerTasks#authenticateClient} authenticateClient Task
 * @param {BrokerTasks#authorizeRegister} authorizeRegister Task
 * @param {BrokerTasks#authorizePublish} authorizePublish Task
 * @param {BrokerTasks#authorizeSubscribe} authorizeSubscribe Task
 * @param {BrokerTasks#markClientOnline} markClientOnline Task
 * @param {BrokerTasks#markClientOffline} markClientOffline Task
 * @returns {BrokerV1VmqRoutes} Routes
 */
module.exports = ({
  authenticateClient,
  authorizeRegister,
  authorizePublish,
  authorizeSubscribe,
  markClientOnline,
  markClientOffline
}) => ({
  authOnPublish:
    initAuthOnPublish({authenticateClient, authorizePublish}),
  authOnRegister:
    initAuthOnRegister({authorizeRegister}),
  authOnSubscribe:
    initAuthOnSubscribe({authenticateClient, authorizeSubscribe}),
  onClientOffline:
    initOnClientOffline({markClientOffline}),
  onClientOnline:
    initOnClientOnline({markClientOnline})
});
