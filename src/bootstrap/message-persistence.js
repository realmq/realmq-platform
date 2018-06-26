const parseTopic = require('../rules/parse-internal-topic');

const initMessageHandler = ({logger, recordMessage}) =>
  /**
   * Forward message
   * @param {string} topic Topic
   * @param {Buffer} message Message
   */
  (topic, message) => {
    const match = parseTopic(topic);
    if (!match || match.isRmqSysTopic) {
      return;
    }

    logger.debug(`forward message on: ${topic}`);

    recordMessage({
      realmId: match.realmId,
      channelId: match.topic,
      message,
    });
  };

module.exports = ({logger, tasks: {broker: {recordMessage}}, mqttClient}) => new Promise((resolve, reject) => {
  const onMessage = initMessageHandler({logger, recordMessage});

  mqttClient.on('message', onMessage);

  // Register on all topics via shared subscription so multiple running
  // instances won't duplicate messages
  // see: https://vernemq.com/docs/configuration/shared_subscriptions.html
  mqttClient.subscribe(
    '$share/message-forwarder/#',
    {qos: 2},
    (err, granted) => {
      if (err) {
        return reject(err);
      }

      if (granted[0].qos !== 2) {
        return reject(new Error('Failed to setup subscribe for message forwarding'));
      }

      resolve(null);
    }
  );

  return {
    stop() {
      return new Promise(resolve => mqttClient.unsubscribe(
        '$share/message-forwarder/#',
        resolve
      ));
    },
  };
});
