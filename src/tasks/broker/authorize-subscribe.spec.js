const initAuthorizeSubscribe = require('./authorize-subscribe');

const rewriteTopicToInternal =
  ({client: {realmId, userId}, topic}) => `${realmId}-${userId}-${topic}`;

describe('The authorizeSubscribe task', () => {
  const subscribableTopic = 'subscribable-topic';
  const unsubscribableTopic = 'unsubscribable-topic';
  const client = {realmId: 'realmId', userId: 'userId'};
  let authorizeSubscribe;

  beforeEach(() => {
    authorizeSubscribe = initAuthorizeSubscribe({
      loadTopicPermissions: async ({topic}) => ({read: topic === subscribableTopic}),
      rewriteTopicToInternal,
    });
  });

  describe('when called with a subscribable subscription', () => {
    it('comes back with a subscription list having internalized topics', async () => {
      const internalTopic = rewriteTopicToInternal({client, topic: subscribableTopic});
      const subscriptions = await authorizeSubscribe(client, [{topic: subscribableTopic, qos: 1}]);

      expect(Array.isArray(subscriptions)).toBe(true);
      expect(subscriptions[0].topic).toBe(internalTopic);
      expect(subscriptions[0].qos).toBe(1);
    });
  });

  describe('when called with an unsubscribable subscription', () => {
    it('comes back with a subscription list having qos errors', async () => {
      const subscriptions = await authorizeSubscribe(
        client,
        [{topic: unsubscribableTopic, qos: 1}]
      );

      expect(Array.isArray(subscriptions)).toBe(true);
      expect(subscriptions[0].qos).toBe(0x80);
    });
  });
});
