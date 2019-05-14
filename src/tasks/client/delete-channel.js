const {success, failure} = require('../../lib/result');
const taskError = require('../../lib/error/task');

/**
 * Init delete channel task
 * @param {ChannelRepository} channelRepository Channel repository
 * @param {SubscriptionRepository} subscriptionRepository Subscription repository
 * @returns {Function} Task
 */
module.exports = ({
  channelRepository,
  subscriptionRepository,
}) =>
  /**
   * @function ClientTasks#deleteChannel
   * @param {AuthModel} authToken Authentication
   * @param {string} id Channel id
   * @returns {Result<ChannelModel>}
   */
  async ({authToken, id}) => {
    const {scope, realmId} = authToken;

    if (scope !== 'admin') {
      return failure(taskError({
        code: 'InsufficientPrivileges',
        message: 'Insufficient privileges to delete a channel.',
      }));
    }

    const channel = await channelRepository.findOne({realmId, id});
    if (!channel) {
      return failure(taskError({
        code: 'UnknownChannel',
        message: 'Channel does not exists.',
      }));
    }

    await channelRepository.findOneAndDelete({realmId, id});
    await subscriptionRepository.deleteAllByChannelId({realmId, channelId: channel.id});

    return success(channel);
  };
