const QOS_FAILURE = 0x80;
/**
 * @typedef {object} authorizeSubscribe~subscription
 * @prop {string} topic
 * @prop {number} qos
 */
/**
 * @param {function} loadTopicPermissions Dependency
 * @param {function} rewriteTopicToInternal Dependency
 * @returns {BrokerTasks#authorizeSubscribe} Task
 */
module.exports = ({loadTopicPermissions, rewriteTopicToInternal}) =>
  /**
   * @typedef {Function} BrokerTasks#authorizeSubscribe
   * @param {{realmId: string, userId: string}} client
   * @param {authorizeSubscribe~subscription[]} subscriptions
   * @return {Promise<authorizeSubscribe~subscription[]>}
   */
  async (client, subscriptions) => {
    return Promise.all(subscriptions.map(async ({topic, qos}) => {
      const internalTopic = rewriteTopicToInternal(topic, client);
      const permissions = await loadTopicPermissions(topic);
      return {
        topic: internalTopic,
        qos: permissions.read ? qos : QOS_FAILURE
      };
    }));
  };
