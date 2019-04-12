const parseDuration = require('../../rules/parse-persistence-duration');
const parseTopic = require('../../rules/parse-internal-topic');

/**
 * @param {Logger} logger Logger
 * @param {ChannelRepository} channelRepository Channel repository
 * @param {MessageRepository} messageRepository Message repository
 * @returns {BrokerTasks#recordMessage} recordMessage
 */
module.exports = ({logger, channelRepository, messageRepository}) =>
  /**
   * @function BrokerTasks#recordMessage
   * @param {string} topic Mqtt topic
   * @param {Buffer} message Message
   * @returns {Promise<>}
   */
  async ({topic, message}) => {
    const match = parseTopic(topic);
    if (!match || match.isRmqSysTopic) {
      return;
    }

    logger.debug(`forward message on: ${topic}`);

    const {realmId, topic: channelId} = match;

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
    } catch (error) {
      logger.error('Message persistence failed.', error);
    }
  };
