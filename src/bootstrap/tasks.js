const authTokenRules = require('../rules/auth-token');

const initAdminTasks = require('../tasks/admin');
const initBrokerTasks = require('../tasks/broker');
const initClientTasks = require('../tasks/client');
const initCommonTasks = require('../tasks/common');
const initRewriteTopicToInternal = require('../rules/rewrite-topic-to-internal');

/**
 * @param {Logger} logger Logging
 * @param {MqttClient} mqttClient Mqtt Client
 * @param {AuthRepository} authRepository Authentication repository
 * @param {ChannelRepository} channelRepository Channel repository
 * @param {MessageRepository} messageRepository Message repository
 * @param {RealmRepository} realmRepository Realm repository
 * @param {SubscriptionRepository} subscriptionRepository Subscription repository
 * @param {UserRepository} userRepository User repository
 * @returns {{broker: BrokerTasks, admin: AdminTasks, client: ClientTasks}} Tasks
 */
module.exports = ({
  logger,
  mqttClient,
  repositories: {
    auth: authRepository,
    channel: channelRepository,
    message: messageRepository,
    realm: realmRepository,
    subscription: subscriptionRepository,
    user: userRepository,
  },
}) => {
  const rewriteTopicToInternal = initRewriteTopicToInternal();

  // Common tasks
  const {
    sendSubscriptionSyncMessage,
  } = initCommonTasks({mqttClient, rewriteTopicToInternal});

  return {
    admin: initAdminTasks({
      authTokenRules,
      authRepository,
      realmRepository,
      userRepository,
    }),
    broker: initBrokerTasks({
      logger,
      authRepository,
      channelRepository,
      subscriptionRepository,
      messageRepository,
    }),
    client: initClientTasks({
      authTokenRules,
      authRepository,
      channelRepository,
      messageRepository,
      userRepository,
      subscriptionRepository,
      sendSubscriptionSyncMessage,
      rewriteTopicToInternal,
      mqttClient
    }),
  };
};
