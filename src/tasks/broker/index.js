const initAuthenticateClient = require('./authenticate-client');
const initAuthorizePublish = require('./authorize-publish');
const initAuthorizeRegister = require('./authorize-register');
const initAuthorizeSubscribe = require('./authorize-subscribe');
const initLoadTopicPermissions = require('./load-topic-permissions');
const initMarkClientOffline = require('./mark-client-offline');
const initMarkClientOnline = require('./mark-client-online');
const initLookupStaticPermissions = require('./lib/lookup-static-topic-permission');
const initRewriteTopicToInternal = require('./lib/rewrite-topic-to-internal');

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
  const lookupStaticPermissions = initLookupStaticPermissions();
  const loadTopicPermissions = initLoadTopicPermissions({
    channelRepository,
    subscriptionRepository,
    lookupStaticPermissions
  });
  const rewriteTopicToInternal = initRewriteTopicToInternal();
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
