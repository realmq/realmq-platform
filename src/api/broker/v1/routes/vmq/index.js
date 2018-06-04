const authOnPublish = require('./auth-on-publish');
const authOnRegister = require('./auth-on-register');
const authOnSubscribe = require('./auth-on-subscribe');

/**
 * @typedef {object} BrokerV1VmqRoutes
 */
/**
 * @param {BrokerTasks#authenticateClient} authenticateClient Task
 * @param {BrokerTasks#authorizeRegister} authorizeRegister Task
 * @param {BrokerTasks#authorizePublish} authorizePublish Task
 * @param {BrokerTasks#authorizeSubscribe} authorizeSubscribe Task
 * @returns {BrokerV1VmqRoutes} Routes
 */
module.exports = ({
  authenticateClient,
  authorizeRegister,
  authorizePublish,
  authorizeSubscribe
}) => ({
  authOnPublish:
    authOnPublish({authenticateClient, authorizePublish}),
  authOnRegister:
    authOnRegister({authorizeRegister}),
  authOnSubscribe:
    authOnSubscribe({authenticateClient, authorizeSubscribe})
});
