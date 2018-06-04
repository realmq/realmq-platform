/**
 * Initialize external to internal topic rewrite function
 * @param {string} [rmqSysTopic="$RMQ"] Root topic level indicating RealMQ system topics
 * @param {string} [realmTopic="realm"] Topic level proceeding realm ID
 * @param {string} [userTopic="user"] Topic level proceeding user ID
 * @returns {function(string, {realmId: string, userId: string}): string} Rewrite function
 */
module.exports = ({rmqSysTopic = '$RMQ', realmTopic = 'realm', userTopic = 'user'} = {}) =>
  /**
   * Rewrite topic from external to internal representation
   *
   * test -> realm/123/test
   * $RMQ/sync/my/subscriptions -> $RMQ/realm/123/sync/user/456/subscriptions
   *
   * @param {string} externalTopic
   * @param {{realmId: string, userId: string}} client
   * @return {string}
   */
  (externalTopic, client) => {
    const externalLevels = externalTopic.split('/');
    const firstLevel = externalLevels[0];
    const isSysTopic = firstLevel === rmqSysTopic;
    let internalLevels = [];

    // $RMQ
    if (isSysTopic) {
      internalLevels.push(externalLevels.shift());
    }
    // Add realm/:id
    internalLevels.push(realmTopic, client.realmId);
    // Replace sync/my -> sync/user/:id
    if (
      externalLevels.length >= 2 &&
      externalLevels[0] === 'sync' &&
      externalLevels[1] === 'my'
    ) {
      internalLevels.push(externalLevels.shift());
      externalLevels.shift();
      internalLevels.push(userTopic, client.userId);
    }
    // Add remaining levels
    internalLevels = internalLevels.concat(externalLevels);

    return internalLevels.join('/');
  };
