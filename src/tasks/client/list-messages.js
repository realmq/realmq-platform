const {success, failure} = require('../../lib/result');
const required = require('../../lib/required-argument');
const {unknown: unknwonChannel} = require('./channel/errors');

/**
 * Init list messages task
 * @param {ChannelRepository} channelRepository The channel repository
 * @param {MessageRepository} messageRepository The message repository
 * @param {SubscriptionRepository} subscriptionRepository The subscription repository
 * @returns {ClientTasks#listMessages} Task
 */
module.exports = ({
  channelRepository = required('channelRepository'),
  messageRepository = required('messageRepository'),
  subscriptionRepository = required('subscriptionRepository'),
}) =>
  /**
   * @function ClientTasks#listMessages
   * @param {AuthModel} authToken Authentication
   * @param {number} channelId The channel id
   * @param {number} [offset] Offset
   * @param {number} [limit] Limit
   * @param {Date} [from] Earliest message
   * @param {Date} [to] Latest message
   * @returns {Result<PaginatedList<MessageModel>>}
   */
  async ({
    authToken = required('authToken'),
    channelId = required('channelId'),
    offset,
    limit,
    from,
    to,
  }) => {
    const {scope, realmId, userId} = authToken;

    if (scope === 'admin') {
      const channel = await channelRepository.findOne({realmId, id: channelId});
      if (!channel) {
        return failure(unknwonChannel());
      }
    } else {
      // Plain users can only access messages of a channel they have a read enabled subscription for.
      const subscription = await subscriptionRepository.findOne({realmId, channelId, userId});
      if (!subscription || !subscription.allowRead) {
        return failure(unknwonChannel());
      }
    }

    const list = await messageRepository.find(
      {realmId, channelId, from, to},
      {offset, limit, sort: {createdAt: -1}}
    );

    return success(list);
  };
