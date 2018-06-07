const bootstrapBrokerTasks = require('../tasks/broker');

/**
 *
 * @param {AuthRepository} authRepository Authentication repository
 * @param {ChannelRepository} channelRepository Channel repository
 * @param {SubscriptionRepository} subscriptionRepository Subscription repository
 * @returns {{broker: BrokerTasks}} Tasks
 */
module.exports = ({
  repositories: {
    auth: authRepository,
    channel: channelRepository,
    subscription: subscriptionRepository
  }
}) => ({
  broker: bootstrapBrokerTasks({
    authRepository,
    channelRepository,
    subscriptionRepository
  })
});
