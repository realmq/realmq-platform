const {success, failure} = require('../../lib/result');
const createTaskError = require('../../lib/error/task');

/**
 * @param {RealmRepository} realmRepository The realm repository
 * @param {ChannelRepository} channelRepository The channel repository
 * @return {AdminTasks#createChannel} Task
 */
module.exports = ({realmRepository, channelRepository}) =>
  /**
   * @function AdminTasks#createChannel
   * @param {{id: string}} account
   * @param {string} realmId
   * @param {string} [id]
   * @param {object} [properties]
   * @param {object} [features]
   * @return {Promise<Result<ChannelModel>>} Channel
   */
  async ({account, realmId, id, properties, features}) => {
    const realm = await realmRepository.findOne({ownerAccountId: account.id, id: realmId});
    if (!realm) {
      return failure(createTaskError({
        code: 'UnknownRealm',
        message: 'Cannot lookup the given realm.',
      }));
    }

    try {
      const channel = await channelRepository.create({realmId, id, properties, features});
      return success(channel);
    } catch (error) {
      if (error.isDuplicateKeyError) {
        return failure(
          createTaskError({
            code: 'ChannelAlreadyExists',
            message: 'A channel with the same id already exists.',
          }),
          error
        );
      }

      return Promise.reject(error);
    }
  };
