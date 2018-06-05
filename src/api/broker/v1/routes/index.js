const constructVmqRoutes = require('./vmq');

/**
 * @typedef {object} BrokerV1Routes
 * @prop {BrokerV1VmqRoutes} vmq
 */
/**
 * @param {BrokerTasks#authenticateClient} authenticateClient Task
 * @param {BrokerTasks#authorizeRegister} authorizeRegister Task
 * @param {BrokerTasks#authorizePublish} authorizePublish Task
 * @param {BrokerTasks#authorizeSubscribe} authorizeSubscribe Task
 * @returns {BrokerV1Routes} Routes
 */
module.exports = ({
  authenticateClient,
  authorizeRegister,
  authorizePublish,
  authorizeSubscribe,
  markClientOffline,
  markClientOnline
}) => ({
  vmq: constructVmqRoutes({
    authenticateClient,
    authorizeRegister,
    authorizePublish,
    authorizeSubscribe,
    markClientOffline,
    markClientOnline
  })
});
