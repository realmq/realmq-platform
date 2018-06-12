const initAuthenticateUser = require('./authenticate-user');
const initCreateChannel = require('./create-channel');
const initCreateSubscription = require('./create-subscription');
const initCreateUser = require('./create-user');
const initDeleteChannel = require('./delete-channel');
const initDeleteSubscription = require('./delete-subscription');
const initDeleteUser = require('./delete-user');
const initFetchChannel = require('./fetch-channel');
const initFetchSubscription = require('./fetch-subscription');
const initFetchUser = require('./fetch-user');
const initListChannels = require('./list-channels');
const initListSubscriptions = require('./list-subscriptions');
const initListUsers = require('./list-users');
const initPatchChannel = require('./patch-channel');
const initPatchSubscription = require('./patch-subscription');
const initPatchUser = require('./patch-user');

/** @typedef {object} ClientTasks */
/**
 * Initialize client tasks
 * @param {AuthRepository} authRepository Auth repository
 * @param {ChannelRepository} channelRepository Auth repository
 * @param {SubscriptionRepository} subscriptionRepository Auth repository
 * @param {UserRepository} userRepository Auth repository
 * @return {ClientTasks} Initialized tasks
 */
module.exports = ({
  authRepository,
  channelRepository,
  subscriptionRepository,
  userRepository,
}) => ({
  authenticateUser:
    initAuthenticateUser({authRepository, userRepository}),
  createChannel:
    initCreateChannel({channelRepository}),
  createSubscription:
    initCreateSubscription({userRepository, channelRepository, subscriptionRepository}),
  createUser:
    initCreateUser({userRepository}),
  deleteChannel:
    initDeleteChannel({channelRepository}),
  deleteSubscription:
    initDeleteSubscription({subscriptionRepository}),
  deleteUser:
    initDeleteUser({userRepository, authRepository, subscriptionRepository}),
  fetchChannel:
    initFetchChannel({channelRepository, subscriptionRepository}),
  fetchSubscription:
    initFetchSubscription({subscriptionRepository}),
  fetchUser:
    initFetchUser({userRepository}),
  listChannels:
    initListChannels({channelRepository, subscriptionRepository}),
  listSubscriptions:
    initListSubscriptions({subscriptionRepository}),
  listUsers:
    initListUsers({userRepository}),
  patchChannel:
    initPatchChannel({channelRepository}),
  patchSubscription:
    initPatchSubscription({subscriptionRepository}),
  patchUser:
    initPatchUser({userRepository}),
});
