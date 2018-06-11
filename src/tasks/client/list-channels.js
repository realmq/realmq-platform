const {success} = require('../../lib/result');
const paginatedList = require('../../models/paginated-list');

/**
 * Init list channels task
 * @param {ChannelRepository} channelRepository Channel repository
 * @param {SubscriptionRepository} subscriptionRepository Subscription repository
 * @returns {Function} Task
 */
module.exports = ({channelRepository, subscriptionRepository}) =>
  /**
   * @function ClientTasks#listChannels
   * @param {AuthModel} authToken Authentication
   * @param {UserModel} user User
   * @param {number} offset Offset
   * @param {number} limit Limit
   * @returns {Result<PaginatedList<ChannelModel>>}
   */
  async ({authToken, user, offset, limit}) => {
    const {scope, realmId} = authToken;

    if (scope === 'admin') {
      // Admins see all repositories
      const list = await channelRepository.find({realmId}, {offset, limit});
      return success(list);
    }

    // Plain users only see channels they have a subscription for
    const {id: userId} = user;
    const subscriptionList = await subscriptionRepository.find({realmId, userId}, {offset, limit});
    if (subscriptionList.items.length === 0) {
      return success(paginatedList({
        offset,
        limit,
        total: subscriptionList.total,
      }));
    }

    const channelIds = subscriptionList.items.map(subscription => subscription.channelId);
    const channelList = await channelRepository.findByIds({realmId, ids: channelIds});

    return success(channelList);
  };
