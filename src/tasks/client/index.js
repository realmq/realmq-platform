const initAuthenticateUser = require('./authenticate-user');
const initCreateAuth = require('./create-auth');
const initCreateChannel = require('./create-channel');
const initCreateMessage = require('./create-message');
const initCreateSubscription = require('./create-subscription');
const initCreateUser = require('./create-user');
const initDeleteAuth = require('./delete-auth');
const initDeleteChannel = require('./delete-channel');
const initDeleteSubscription = require('./delete-subscription');
const initDeleteUser = require('./delete-user');
const initFetchAuth = require('./fetch-auth');
const initFetchChannel = require('./fetch-channel');
const initFetchSubscription = require('./fetch-subscription');
const initFetchUser = require('./fetch-user');
const initListAuths = require('./list-auths');
const initListChannels = require('./list-channels');
const initListMessages = require('./list-messages');
const initListSubscriptions = require('./list-subscriptions');
const initListUsers = require('./list-users');
const initPatchAuth = require('./patch-auth');
const initPatchChannel = require('./patch-channel');
const initPatchSubscription = require('./patch-subscription');
const initPatchUser = require('./patch-user');

/** @typedef {object} ClientTasks */
/**
 * Initialize client tasks
 * @param {AuthTokenRules} authTokenRules Auth rules
 * @param {AuthRepository} authRepository Auth repository
 * @param {ChannelRepository} channelRepository Auth repository
 * @param {MessageRepository} messageRepository Message repository
 * @param {RealtimeConnectionRepository} realtimeConnectionRepository realtime connection repository
 * @param {SubscriptionRepository} subscriptionRepository Subscription repository
 * @param {UserRepository} userRepository Auth repository
 * @param {CommonTasks#sendSubscriptionSync} sendSubscriptionSync Send subscription created task
 * @param {Rules#rewriteTopicToInternal} rewriteTopicToInternal Topic rewrite rule
 * @param {MqttClient} mqttClient Mqtt client
 * @return {ClientTasks} Initialized tasks
 */
module.exports = ({
  authTokenRules,
  authRepository,
  channelRepository,
  messageRepository,
  realtimeConnectionRepository,
  subscriptionRepository,
  userRepository,
  sendSubscriptionSyncMessage,
  rewriteTopicToInternal,
  mqttClient,
}) => ({
  authenticateUser:
    initAuthenticateUser({authRepository, userRepository}),
  createAuth:
    initCreateAuth({authTokenRules, authRepository, userRepository}),
  createChannel:
    initCreateChannel({channelRepository}),
  createMessage: initCreateMessage({
    channelRepository,
    mqttClient,
    subscriptionRepository,
    rewriteTopicToInternal,
  }),
  createSubscription:
    initCreateSubscription({
      userRepository,
      channelRepository,
      subscriptionRepository,
      sendSubscriptionSyncMessage,
    }),
  createUser:
    initCreateUser({userRepository}),
  deleteAuth:
    initDeleteAuth({authRepository, realtimeConnectionRepository}),
  deleteChannel:
    initDeleteChannel({channelRepository, subscriptionRepository}),
  deleteSubscription:
    initDeleteSubscription({subscriptionRepository, sendSubscriptionSyncMessage}),
  deleteUser:
    initDeleteUser({
      userRepository,
      authRepository,
      subscriptionRepository,
      realtimeConnectionRepository,
    }),
  fetchAuth:
    initFetchAuth({authRepository}),
  fetchChannel:
    initFetchChannel({channelRepository, subscriptionRepository}),
  fetchSubscription:
    initFetchSubscription({subscriptionRepository}),
  fetchUser:
    initFetchUser({userRepository}),
  listAuths:
    initListAuths({authRepository}),
  listChannels:
    initListChannels({channelRepository, subscriptionRepository}),
  listMessages:
    initListMessages({channelRepository, messageRepository, subscriptionRepository}),
  listSubscriptions:
    initListSubscriptions({subscriptionRepository}),
  listUsers:
    initListUsers({userRepository}),
  patchAuth:
    initPatchAuth({authRepository}),
  patchChannel:
    initPatchChannel({channelRepository}),
  patchSubscription:
    initPatchSubscription({subscriptionRepository, sendSubscriptionSyncMessage}),
  patchUser:
    initPatchUser({userRepository}),
});
