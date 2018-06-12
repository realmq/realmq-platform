const initAuthenticateUser = require('./authenticate-user');
const initCreateChannel = require('./create-channel');
const initCreateUser = require('./create-user');
const initDeleteChannel = require('./delete-channel');
const initFetchChannel = require('./fetch-channel');
const initListChannels = require('./list-channels');
const initListUsers = require('./list-users');
const initPatchChannel = require('./patch-channel');

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
  fetchChannel: initFetchChannel({channelRepository, subscriptionRepository}),
  listChannels: initListChannels({channelRepository, subscriptionRepository}),
  listUsers: initListUsers({userRepository}),
  patchChannel: initPatchChannel({channelRepository}),
});
