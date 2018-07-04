const subscriptionRepository = require('../../lib/test/mocks/repositories/subscription');
const initSendSubscriptionSync = require('./send-subscription-sync');

describe('The common sendSubscriptionSync task', () => {
  const message = 'testSendSubscriptionSyncMessage';
  const publish = jest.fn((topic, message, cb) => cb());
  let sendSubscriptionCreatedSync;

  beforeEach(() => {
    sendSubscriptionCreatedSync = initSendSubscriptionSync({
      mqttClient: {publish},
      rewriteTopicToInternal: ({topic}) => topic,
      createSyncSubscriptionMessage: () => message,
    });
  });

  describe('when called without subscription', () => {
    it('should not execute', async () => {
      const {ok, error} = await sendSubscriptionCreatedSync();

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(publish).not.toHaveBeenCalled();
    });
  });

  describe('when called without action', () => {
    it('should not execute', async () => {
      const {ok, error} =
        await sendSubscriptionCreatedSync(subscriptionRepository.validSubscription);

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(publish).not.toHaveBeenCalled();
    });
  });

  describe('when called with invalid subscription', () => {
    it('should not execute', async () => {
      const {ok, error} = await sendSubscriptionCreatedSync({userId: 'foobar'}, 'updated');

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(publish).not.toHaveBeenCalled();
    });
  });

  describe('when called with valid subscription', () => {
    it('should send a message on the sync channel', async () => {
      const {ok} = await sendSubscriptionCreatedSync(
        subscriptionRepository.validSubscription,
        'updated'
      );

      expect(ok).toBe(true);

      expect(publish).toHaveBeenCalled();
      const [publishedTopic, publishedMessage] = publish.mock.calls[0];
      expect(publishedTopic).toEqual('$RMQ/sync/my/subscriptions');
      expect(publishedMessage).toEqual(message);
    });
  });
});
