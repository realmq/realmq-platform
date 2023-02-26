module.exports = function publishMessage({ mqttClient, topic, message }) {
  return new Promise((resolve, reject) => {
    mqttClient.publish(topic, message, err => (err ? reject(err) : resolve()));
  });
}
