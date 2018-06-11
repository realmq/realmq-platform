const {success, failure} = require('../../lib/result');
const error = require('../../lib/error/task');

/**
 * Init patch channel task
 * @param {ChannelRepository} channelRepository Channel repository
 * @returns {Function} Task
 */
module.exports = ({channelRepository}) =>
  /**
   * @function ClientTasks#deleteChannel
   * @param {AuthModel} authToken Authentication
   * @param {string} id Channel id
   * @returns {Result<ChannelModel>}
   */
  async ({authToken, id}) => {
    const {scope, realmId} = authToken;

    if (scope !== 'admin') {
      return failure(error({
        code: 'InsufficientPrivileges',
        message: 'Insufficient privileges to delete a channel.',
      }));
    }

    const channel = await channelRepository.findOne({realmId, id});
    if (!channel) {
      return failure(error({
        code: 'UnknownChannel',
        message: 'Channel does not exists.',
      }));
    }

    await channelRepository.findOneAndDelete({realmId, id});
    return success(channel);
  };
