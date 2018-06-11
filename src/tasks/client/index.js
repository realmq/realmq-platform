const initAuthenticateUser = require('./authenticate-user');
const initCreateChannel = require('./create-channel');
const initListChannels = require('./list-channels');

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
  listChannels: initListChannels({channelRepository, subscriptionRepository}),
});
