const initAuthenticateClient = require('./authenticate-client');
const initAuthorizePublish = require('./authorize-publish');
const initAuthorizeRegister = require('./authorize-register');
const initAuthorizeSubscribe = require('./authorize-subscribe');
const initMarkClientOffline = require('./mark-client-offline');
const initMarkClientOnline = require('./mark-client-online');

/**
 * @typedef {object} BrokerTasks
 */
/**
 * Initialize broker tasks
 * @param {function} loadAuth Load auth model
 * @param {function} updateAuth Update auth model
 * @param {function} loadTopicPermissions Load topic permissions
 * @return {BrokerTasks} Initialized tasks
 */
module.exports = ({loadAuth, updateAuth, loadTopicPermissions}) => {
  const rewriteTopicToInternal = () => {};
  const authenticateClient = initAuthenticateClient({loadAuth});
  return {
    authenticateClient,
    authorizePublish:
      initAuthorizePublish({loadTopicPermissions, rewriteTopicToInternal}),
    authorizeRegister:
      initAuthorizeRegister({authenticateClient}),
    authorizeSubscribe:
      initAuthorizeSubscribe({loadTopicPermissions, rewriteTopicToInternal}),
    markClientOffline:
      initMarkClientOffline({loadAuth, updateAuth}),
    markClientOnline:
      initMarkClientOnline({loadAuth, updateAuth})
  };
};
