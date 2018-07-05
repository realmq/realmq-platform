const subscriptionRepository = require('../lib/test/mocks/repositories/subscription');
const createSubscriptionSyncMessage = require('./subscription-sync-message');

describe('The syncSubscriptionMessage rule', () => {
  it('should generate a valid message', () => {
    const action = 'test';
    const message = createSubscriptionSyncMessage({
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
