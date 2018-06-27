/**
 * @param {BrokerTasks#recordMessage} recordMessage
 * @param {MqttClient} mqttClient
 * @return {Promise<{stop: function}>}
 */
module.exports = ({tasks: {broker: {recordMessage}}, mqttClient}) => new Promise((resolve, reject) => {
  mqttClient.on('message', (topic, message) => recordMessage({topic, message}));

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
