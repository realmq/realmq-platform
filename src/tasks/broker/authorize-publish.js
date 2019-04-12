/**
 *
 * @param {function} loadTopicPermissions Dependency
 * @param {function} rewriteTopicToInternal Dependency
 * @returns {BrokerTasks#authorizePublish} Task
 */
module.exports = ({loadTopicPermissions, rewriteTopicToInternal}) =>
  /**
   * @typedef {Function} BrokerTasks#authorizePublish
   * @param {{realmId: string, userId: string}} client
   * @param {string} topic
   * @returns {Promise<{authorized: boolean, internalTopic: string=}>}
   */
  async (client, topic) => {
    const permissions = await loadTopicPermissions({
      realmId: client.realmId,
      userId: client.userId,
      topic,
    });
    if (permissions.write) {
      const internalTopic = rewriteTopicToInternal({topic, client});
      return {authorized: true, internalTopic};
    }

    return {authorized: false};
  };
