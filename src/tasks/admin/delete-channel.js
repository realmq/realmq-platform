const {success, failure} = require('../../lib/result');
const taskError = require('../../lib/error/task');
const createTaskError = require('../../lib/error/task');

/**
 * Init delete channel task
 * @param {RealmRepository} realmRepository Realm repository
 * @param {ChannelRepository} channelRepository Channel repository
 * @param {SubscriptionRepository} subscriptionRepository Subscription repository
 * @param {MessageRepository} messageRepository Message repository
 * @returns {Function} Task
 */
module.exports = ({
  realmRepository,
  channelRepository,
  subscriptionRepository,
  messageRepository,
}) =>
  /**
   * @function AdminTasks#deleteChannel
   * @param {string} realmId Realm id
   * @param {string} id Channel id
   * @returns {Result<ChannelModel>}
   */
  async ({realmId, id}) => {
    const realm = await realmRepository.findOne({id: realmId});
    if (!realm) {
      return failure(createTaskError({
        code: 'UnknownRealm',
        message: 'Cannot lookup the given realm.',
      }));
    }

    const channel = await channelRepository.findOne({realmId, id});
    if (!channel) {
      return failure(taskError({
        code: 'UnknownChannel',
        message: 'Channel does not exists.',
      }));
    }

    await Promise.all([
      channelRepository.deleteOne({realmId, id}),
      subscriptionRepository.deleteAllByChannelId({realmId, channelId: id}),
      messageRepository.deleteAllByChannelId({realmId, channelId: id}),
    ]);

    return success(channel);
  };
