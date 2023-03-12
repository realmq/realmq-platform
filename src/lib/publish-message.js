function publishMessage({mqttClient, topic, message}) {
  return new Promise((resolve, reject) => {
    mqttClient.publish(topic, message, error => (error ? reject(error) : resolve()));
  });
}

module.exports = publishMessage;
