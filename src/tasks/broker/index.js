const initAuthenticateClient = require('./authenticate-client');
const initAuthorizePublish = require('./authorize-publish');
const initAuthorizeRegister = require('./authorize-register');
const initAuthorizeSubscribe = require('./authorize-subscribe');
const initLoadTopicPermissions = require('./load-topic-permissions');
const initMarkClientOffline = require('./mark-client-offline');
const initMarkClientOnline = require('./mark-client-online');

/**
 * @typedef {object} BrokerTasks
 */
/**
 * Initialize broker tasks
 * @param {AuthRepository} authRepository Auth repository
 * @param {ChannelRepository} channelRepository Channel repository
 * @param {SubscriptionRepository} subscriptionRepository Subscription repository
 * @return {BrokerTasks} Initialized tasks
 */
module.exports = ({authRepository, channelRepository, subscriptionRepository}) => {
  const loadTopicPermissions = () => ({read: false, write: false});
  const rewriteTopicToInternal = t => t;
  const authenticateClient = initAuthenticateClient({authRepository});
  return {
    authenticateClient,
    authorizePublish:
      initAuthorizePublish({loadTopicPermissions, rewriteTopicToInternal}),
    authorizeRegister:
      initAuthorizeRegister({authenticateClient}),
    authorizeSubscribe:
      initAuthorizeSubscribe({loadTopicPermissions, rewriteTopicToInternal}),
    markClientOffline:
      initMarkClientOffline({authRepository}),
    markClientOnline:
      initMarkClientOnline({authRepository})
  };
};
