const {success, failure} = require('../../lib/result');
const createTaskError = require('../../lib/error/task');

/**
 * @param {RealmRepository} realmRepository The realm repository
 * @param {ChannelRepository} channelRepository Channel repository
 * @returns {AdminTasks#listChannels} Task
 */
module.exports = ({realmRepository, channelRepository}) =>
  /**
   * @function AdminTasks#listChannels
   * @param {object} args
   * @param {number} args.realmId
   * @param {number} args.offset
   * @param {number} args.limit
   * @return {Promise<PaginatedList<ChannelModel>>} Paginated list
   */
  async ({realmId, offset, limit}) => {
    const realm = await realmRepository.findOne({id: realmId});
    if (!realm) {
      return failure(createTaskError({
        code: 'UnknownRealm',
        message: 'Cannot lookup the given realm.',
      }));
    }

    return success(await channelRepository.find({realmId}, {offset, limit}));
  };
