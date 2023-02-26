const {success, failure} = require('../../lib/result');
const required = require('../../lib/required-argument');
const publishMessage = require('../../lib/publish-message');
const {unknown: unknwonChannel} = require('./channel/errors');

/**
 * Init list messages task
 * @param {ChannelRepository} channelRepository The channel repository
 * @param {MqttClient} mqttClient Mqtt client
 * @param {SubscriptionRepository} subscriptionRepository The subscription repository
 * @param {Rules#rewriteTopicToInternal} rewriteTopicToInternal Topic rewrite rule
 * @returns {ClientTasks#createMessage} Task
 */
module.exports = ({
  channelRepository = required('channelRepository'),
  mqttClient = required('mqttClient'),
  subscriptionRepository = required('subscriptionRepository'),
  rewriteTopicToInternal = required('rewriteTopicToInternal')
}) =>
  /**
   * @function ClientTasks#createMessage
   * @param {AuthModel} authToken Authentication
   * @param {string} channelId The channel id
   * @param {string} content The message payload
   * @returns {Result<void>}
   */
  async ({
    authToken = required('authToken'),
    channelId = required('channelId'),
    content = required('content'),
  }) => {
    const {scope, realmId, userId} = authToken;

    if (scope === 'admin') {
      const channel = await channelRepository.findOne({realmId, id: channelId});
      if (!channel) {
        return failure(unknwonChannel());
      }
    } else {
      // Plain users can only publish messages to a channel they have a write-enabled subscription for.
      const subscription = await subscriptionRepository.findOne({realmId, channelId, userId});
      if (!subscription || !subscription.allowWrite) {
        return failure(unknwonChannel());
      }
    }

    const topic = rewriteTopicToInternal({topic: channelId, client: { realmId }});
    await publishMessage({mqttClient, topic, message: content});

    return success(null);
  };
