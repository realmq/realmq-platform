module.exports = ({rmqSysTopic = '$RMQ'} = {}) => {
  const staticTopicPermissions = new Map([
    [`${rmqSysTopic}/sync/my/subscriptions`, {read: true, write: false}],
  ]);
  return ({topic}) => staticTopicPermissions.get(topic);
};
