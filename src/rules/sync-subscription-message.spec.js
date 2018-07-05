const subscriptionRepository = require('../lib/test/mocks/repositories/subscription');
const createSyncSubscriptionMessage = require('./sync-subscription-message');

describe('The syncSubscriptionMessage rule', () => {
  it('should generate a valid message', () => {
    const action = 'test';
    const message = createSyncSubscriptionMessage({
      subscription: subscriptionRepository.validSubscription,
      action,
    });
    const parsedMessage = JSON.parse(message);

    expect(typeof message).toBe('string');
    expect(parsedMessage.event).toBe(`subscription-${action}`);
    expect(parsedMessage.ts).toBeDefined();
    expect(parsedMessage.data).toBeDefined();
  });
});
