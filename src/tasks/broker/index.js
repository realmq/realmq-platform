const initAuthenticateClient = require('./authenticate-client');
const initAuthorizePublish = require('./authorize-publish');
const initAuthorizeRegister = require('./authorize-register');
const initAuthorizeSubscribe = require('./authorize-subscribe');

/**
 * @typedef {object} BrokerTasks
 */
/**
 * Initialize broker tasks
 * @return {BrokerTasks} Initialized tasks
 */
module.exports = ({loadAuth, loadTopicPermissions}) => {
  const rewriteTopicToInternal = () => {};
  const authenticateClient = initAuthenticateClient({loadAuth});
  return {
    authenticateClient,
    authorizePublish:
      initAuthorizePublish({loadTopicPermissions, rewriteTopicToInternal}),
    authorizeRegister:
      initAuthorizeRegister({authenticateClient}),
    authorizeSubscribe:
      initAuthorizeSubscribe({loadTopicPermissions, rewriteTopicToInternal})
  };
};
