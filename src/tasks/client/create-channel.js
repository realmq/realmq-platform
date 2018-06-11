const {success, failure} = require('../../lib/result');
const error = require('../../lib/error/task');

/**
 * Init create channel task
 * @param {ChannelRepository} channelRepository Channel repository
 * @returns {Function} Task
 */
module.exports = ({channelRepository}) =>
  /**
   * @function ClientTasks#createChannel
   * @param {AuthModel} authToken Authentication
   * @param {UserModel} user User
   * @param {object} data Entity data
   * @returns {Result<>}
   */
  async ({authToken, data}) => {
    const {scope, realmId} = authToken;

    if (scope !== 'admin') {
      return failure(error(
        'InsufficientPrivileges',
        'Insufficient privileges to create a channel.'
      ));
    }

    try {
      const channel = await channelRepository.create({
        ...data,
        realmId,
      });
      return success(channel);
    } catch (creationError) {
      if (creationError.name === 'RepositoryError' && creationError.reason === 'duplicate') {
        return failure(
          error(
            'ChannelAlreadyExists',
            'A channel with the same id already exists.'
          ),
          creationError
        );
      }
      return Promise.reject(creationError);
    }
  };
