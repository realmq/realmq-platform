const initAuthOnPublish = require('../../../../../api/broker/v1/routes/vmq/auth-on-publish');
const initAuthOnRegister = require('../../../../../api/broker/v1/routes/vmq/auth-on-register');
const initAuthOnSubscribe = require('../../../../../api/broker/v1/routes/vmq/auth-on-subscribe');
const initOnClientOffline = require('../../../../../api/broker/v1/routes/vmq/on-client-offline');
const initOnClientOnline = require('../../../../../api/broker/v1/routes/vmq/on-client-online');

/**
 * @param {BrokerTasks} brokerTasks Broker tasks
 * @returns {object<string, function>} Routes
 */
module.exports = ({brokerTasks}) => ({
  authOnPublish: initAuthOnPublish(brokerTasks),
  authOnRegister: initAuthOnRegister(brokerTasks),
  authOnSubscribe: initAuthOnSubscribe(brokerTasks),
  onClientOffline: initOnClientOffline(brokerTasks),
  onClientOnline: initOnClientOnline(brokerTasks)
});
