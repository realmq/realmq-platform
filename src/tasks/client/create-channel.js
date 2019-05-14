const {success, failure} = require('../../lib/result');
const taskError = require('../../lib/error/task');

/**
 * Init create channel task
 * @param {ChannelRepository} channelRepository Channel repository
 * @returns {Function} Task
 */
module.exports = ({channelRepository}) =>
  /**
   * @function ClientTasks#createChannel
   * @param {AuthModel} authToken Authentication
   * @param {object} data Entity data
   * @returns {Result<>}
   */
  async ({authToken, data}) => {
    const {scope, realmId} = authToken;

    if (scope !== 'admin') {
      return failure(taskError({
        code: 'InsufficientPrivileges',
        message: 'Insufficient privileges to create a channel.',
      }));
    }

    try {
      const channel = await channelRepository.create({
        ...data,
        realmId,
      });
      return success(channel);
    } catch (error) {
      if (error.isDuplicateKeyError) {
        return failure(
          taskError({
            code: 'ChannelAlreadyExists',
            message: 'A channel with the same id already exists.',
          }),
          error
        );
      }

      return Promise.reject(error);
    }
  };
