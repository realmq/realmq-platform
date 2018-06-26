const initRewriteTopicToInternal = require('../../rules/rewrite-topic-to-internal');
const initAuthenticateClient = require('./authenticate-client');
const initAuthorizePublish = require('./authorize-publish');
const initAuthorizeRegister = require('./authorize-register');
const initAuthorizeSubscribe = require('./authorize-subscribe');
const initLoadTopicPermissions = require('./load-topic-permissions');
const initLookupStaticPermissions = require('./lib/lookup-static-topic-permission');
const initMarkClientOffline = require('./mark-client-offline');
const initMarkClientOnline = require('./mark-client-online');
const initRecordMessage = require('./record-message');

/**
 * @typedef {object} BrokerTasks
 */
/**
 * Initialize broker tasks
 * @param {Logger} logger Logging
 * @param {AuthRepository} authRepository Auth repository
 * @param {ChannelRepository} channelRepository Channel repository
 * @param {MessageRepository} messageRepository Message repository
 * @param {SubscriptionRepository} subscriptionRepository Subscription repository
 * @return {BrokerTasks} Initialized tasks
 */
module.exports = ({logger, authRepository, channelRepository, messageRepository, subscriptionRepository}) => {
  const lookupStaticPermissions = initLookupStaticPermissions();
  const loadTopicPermissions = initLoadTopicPermissions({
    channelRepository,
    subscriptionRepository,
    lookupStaticPermissions,
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
      initMarkClientOnline({authRepository}),
    recordMessage:
      initRecordMessage({channelRepository, messageRepository, logger}),
  };
};
