const {success, failure} = require('../../lib/result');
const createTaskError = require('../../lib/error/task');

/**
 * @param {ChannelRepository} channelRepository The channel repository
 * @param {RealmRepository} realmRepository The realm repository
 * @returns {AdminTasks#createRealm} Task
 */
module.exports = ({channelRepository, realmRepository}) =>
  /**
   * @typedef {Function} AdminTasks#createChannel
   * @param {object} args
   * @param {string} args.realmId The realm of the channel
   * @param {string} [args.id] The custom id of the channel
   * @param {object} [args.properties] An optional hash map of additional properties.
   * @param {object} [args.features] An optional hash map of channel features.
   * @return {Promise<Result<?ChannelModel>>} channel
   */
  async ({realmId, id, properties = {}, features}) => {
    const realm = await realmRepository.findOne({id: realmId});

    if (!realm) {
      return failure(createTaskError({
        code: 'UnknownRealm',
        message: 'Cannot lookup the given realm.',
      }));
    }

    try {
      return success(await channelRepository.create({realmId, id, properties, features}));
    } catch (error) {
      if (error.isDuplicateKeyError) {
        return failure(
          createTaskError({
            code: 'ChannelAlreadyExists',
            message: 'Channel could not be created, since a channel with the same id already exists.',
          }),
          error
        );
      }

      throw error;
    }
  }
