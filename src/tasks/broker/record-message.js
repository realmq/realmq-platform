const parseDuration = require('../../rules/parse-persistence-duration');

/**
 * @param {Logger} logger Logger
 * @param {ChannelRepository} channelRepository Channel repository
 * @param {MessageRepository} messageRepository Message repository
 * @returns {BrokerTasks#recordMessage} recordMessage
 */
module.exports = ({logger, channelRepository, messageRepository}) =>
  /**
   * @function BrokerTasks#recordMessage
   * @param {string} realmId Realm ID
   * @param {string} channelId Channel ID
   * @param {Buffer} message Message
   * @returns {Promise<>}
   */
  async ({realmId, channelId, message}) => {
    try {
      const channel = await channelRepository.findOne({realmId, id: channelId});

      if (!channel) {
        logger.warn(`Cannot persist message of unknown channel: ${channelId}`);
        return;
      }

      const {persistence = {}} = channel.features || {};
      if (!persistence.enabled || (persistence.duration && parseDuration(persistence.duration) === 0)) {
        return;
      }

      const record = {
        realmId,
        channelId,
        content: message,
      };

      await messageRepository.create(record);
    } catch (err) {
      logger.warn('Message persistence failed.', err);
    }
  };
