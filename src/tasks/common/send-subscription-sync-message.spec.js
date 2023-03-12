const subscriptionRepository = require('../../lib/test/mocks/repositories/subscription');
const initSendSubscriptionSyncMessage = require('./send-subscription-sync-message');

describe('The common sendSubscriptionSync task', () => {
  const message = 'testSendSubscriptionSyncMessage';
  const publish = jest.fn((topic, message, cb) => cb());
  let sendSubscriptionSyncMessage;

  beforeEach(() => {
    sendSubscriptionSyncMessage = initSendSubscriptionSyncMessage({
      mqttClient: {publish},
      rewriteTopicToInternal: ({topic}) => topic,
      generateSubscriptionSyncMessage: () => message,
    });
  });

  describe('when called without subscription', () => {
    it('should not execute', async () => {
      const {ok, error} = await sendSubscriptionSyncMessage({});

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(publish).not.toHaveBeenCalled();
    });
  });

  describe('when called without action', () => {
    it('should not execute', async () => {
      const {ok, error}
        = await sendSubscriptionSyncMessage({
          subscription: subscriptionRepository.validSubscription,
        });

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(publish).not.toHaveBeenCalled();
    });
  });

  describe('when called with invalid subscription', () => {
    it('should not execute', async () => {
      const {ok, error} = await sendSubscriptionSyncMessage({
        subscription: {userId: 'foobar'},
        action: 'updated',
      });

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(publish).not.toHaveBeenCalled();
    });
  });

  describe('when called with valid subscription', () => {
    it('should send a message on the sync channel', async () => {
      const {ok} = await sendSubscriptionSyncMessage({
        subscription: subscriptionRepository.validSubscription,
        action: 'updated',
      });

      expect(ok).toBe(true);

      expect(publish).toHaveBeenCalled();
      const [publishedTopic, publishedMessage] = publish.mock.calls[0];
      expect(publishedTopic).toEqual('$RMQ/sync/my/subscriptions');
      expect(publishedMessage).toEqual(message);
    });
  });
});
