const isSysTopicLevel = topicLevel => topicLevel[0] === '$';
const isRmqSysTopicLevel = topicLevel => topicLevel === '$RMQ';

/**
 * Parse internal topic.
 *
 * @param {string} topic Topic
 * @return {TopicParseResult} Topic parse result
 */
module.exports = topic => {
  const parts = topic.split('/');
  const isSysTopic = isSysTopicLevel(parts[0]);
  const isRmqSysTopic = isRmqSysTopicLevel(parts[0]);

  if (!isRmqSysTopic && isSysTopic) {
    // Don't handle it
    return null;
  }

  // Remove "$RMQ"
  if (isRmqSysTopic) {
    parts.shift();
  }
  // Remove "realm"
  parts.shift();
  // Remove ":realmId"
  const realmId = parts.shift();

  let isSync = false;
  let userId = null;
  if (
    isRmqSysTopic &&
    parts.length >= 3 &&
    parts[0] === 'sync' &&
    parts[1] === 'user'
  ) {
    // Like: sync/user/:uid
    parts.shift();
    isSync = true;
    parts.shift();
    userId = parts.shift();
  }

  /**
   * @class TopicParseResult
   */
  return {
    isRmqSysTopic,
    isSync,
    realmId,
    userId,
    topic: parts.join('/'),
  };
};

module.exports.isSysTopicLevel = isSysTopicLevel;
module.exports.isRmqSysTopicLevel = isRmqSysTopicLevel;
