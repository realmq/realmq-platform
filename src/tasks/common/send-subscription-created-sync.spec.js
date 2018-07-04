const subscriptionRepository = require('../../lib/test/mocks/repositories/subscription');
const initSendSubscriptionCreatedSync = require('./send-subscription-created-sync');

describe('The common sendSubscriptionCreatedSync task', () => {
  const message = 'testSendSubscriptionCreatedSyncMessage';
  const mqttPublish = jest.fn();
  let sendSubscriptionCreatedSync;

  beforeEach(() => {
    sendSubscriptionCreatedSync = initSendSubscriptionCreatedSync({
      rewriteTopicToInternal: ({topic}) => topic,
      mqttClient: {publish: mqttPublish},
      syncSubscriptionMessage: {generateSubscriptionCreatedMessage: () => message},
    });
  });

  describe('when called with no subscription', () => {
    it('should not execute', () => {
      sendSubscriptionCreatedSync({});
      expect(mqttPublish).not.toHaveBeenCalled();
    });
  });

  describe('when called with invalid subscription', () => {
    it('should not execute', () => {
      sendSubscriptionCreatedSync({userId: 'foobar'});
      expect(mqttPublish).not.toHaveBeenCalled();
    });
  });

  describe('when called with valid subscription', () => {
    it('should send a message on the sync channel', () => {
      sendSubscriptionCreatedSync(subscriptionRepository.validSubscription);
      expect(mqttPublish).toHaveBeenCalled();

      const [publishedTopic, publishedMessage] = mqttPublish.mock.calls[0];
      expect(publishedTopic).toEqual('$RMQ/sync/my/subscriptions');
      expect(publishedMessage).toEqual(message);
    });
  });
});
