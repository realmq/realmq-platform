const accountRules = require('../rules/account');
const authTokenRules = require('../rules/auth-token');

const initAdminTasks = require('../tasks/admin');
const initBrokerTasks = require('../tasks/broker');
const initClientTasks = require('../tasks/client');
const initCommonTasks = require('../tasks/common');

/**
 * @param {Logger} logger Logging
 * @param {MqttClient} mqttClient Mqtt Client
 * @param {AccountRepository} accountRepository Account repository
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
    account: accountRepository,
    auth: authRepository,
    channel: channelRepository,
    message: messageRepository,
    realm: realmRepository,
    subscription: subscriptionRepository,
    user: userRepository,
  },
}) => {
  // Common tasks
  const {
    sendSubscriptionSyncMessage,
  } = initCommonTasks({mqttClient});

  return {
    admin: initAdminTasks({
      accountRules,
      authTokenRules,
      accountRepository,
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
    }),
  };
};
