const {success} = require('../../lib/result');

/**
 * Init fetch channel task
 * @param {ChannelRepository} channelRepository Channel repository
 * @param {SubscriptionRepository} subscriptionRepository Subscription repository
 * @returns {Function} Task
 */
module.exports = ({channelRepository, subscriptionRepository}) =>
  /**
   * @function ClientTasks#fetchChannel
   * @param {AuthModel} authToken Authentication
   * @param {string} id Channel id
   * @returns {Result<?ChannelModel>}
   */
  async ({authToken, id}) => {
    const {scope, realmId, userId} = authToken;

    if (scope !== 'admin') {
      // Plain users can only access channels they have a subscription for
      const subscription = await subscriptionRepository.findOne({realmId, channelId: id, userId});
      if (!subscription) {
        return success(null);
      }
    }

    const channel = await channelRepository.findOne({realmId, id});
    return success(channel);
  };
