const {success, failure} = require('../../lib/result');
const createTaskError = require('../../lib/error/task');

/**
 * Init list channels task
 * @param {ChannelRepository} channelRepository Channel repository
 * @param {RealmRepository} realmRepository Realm repository
 * @returns {Function} Task
 */
module.exports = ({channelRepository, realmRepository}) =>
  /**
   * @function AdminTasks#listChannels
   * @param {{id: string}} account
   * @param {String} realmId RealmId
   * @param {number} offset Offset
   * @param {number} limit Limit
   * @returns {Result<PaginatedList<ChannelModel>>}
   */
  async ({account, realmId, offset, limit}) => {
    const realm = await realmRepository.findOne({ownerAccountId: account.id, id: realmId});
    if (!realm) {
      return failure(createTaskError({
        code: 'UnknownRealm',
        message: 'Cannot lookup the given realm.',
      }));
    }

    return success(await channelRepository.find({realmId}, {offset, limit}));
  };
