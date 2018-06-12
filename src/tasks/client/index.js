const initAuthenticateUser = require('./authenticate-user');
const initCreateChannel = require('./create-channel');
const initCreateUser = require('./create-user');
const initDeleteChannel = require('./delete-channel');
const initDeleteUser = require('./delete-user');
const initFetchChannel = require('./fetch-channel');
const initFetchUser = require('./fetch-user');
const initListChannels = require('./list-channels');
const initListUsers = require('./list-users');
const initPatchChannel = require('./patch-channel');
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
  authenticateUser: initAuthenticateUser({authRepository, userRepository}),
  createChannel: initCreateChannel({channelRepository}),
  createUser: initCreateUser({userRepository}),
  deleteChannel: initDeleteChannel({channelRepository}),
  deleteUser: initDeleteUser({userRepository, authRepository, subscriptionRepository}),
  fetchChannel: initFetchChannel({channelRepository, subscriptionRepository}),
  fetchUser: initFetchUser({userRepository}),
  listChannels: initListChannels({channelRepository, subscriptionRepository}),
  listUsers: initListUsers({userRepository}),
  patchChannel: initPatchChannel({channelRepository}),
  patchUser: initPatchUser({userRepository}),
});
