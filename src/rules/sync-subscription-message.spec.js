const subscriptionRepository = require('../lib/test/mocks/repositories/subscription');
const {
  generateSubscriptionCreatedMessage,
  generateSubscriptionDeletedMessage,
  generateSubscriptionUpdatedMessage,
} = require('./sync-subscription-message');

const expectMessageToBeValid = (message, action) => {
  const parsedMessage = JSON.parse(message);

  expect(typeof message).toBe('string');
  expect(parsedMessage.event).toBe(`subscription-${action}`);
  expect(parsedMessage.ts).toBeDefined();
  expect(parsedMessage.data).toBeDefined();
};

describe('The syncSubscriptionMessage rule', () => {
  it('should generate a \'subscription created\' message', () => {
    const message = generateSubscriptionCreatedMessage(subscriptionRepository.validSubscription);
    expectMessageToBeValid(message, 'created');
  });

  it('should generate a \'subscription updated\' message', () => {
    const message = generateSubscriptionUpdatedMessage(subscriptionRepository.validSubscription);
    expectMessageToBeValid(message, 'updated');
  });

  it('should generate a \'subscription deleted\' message', () => {
    const message = generateSubscriptionDeletedMessage(subscriptionRepository.validSubscription);
    expectMessageToBeValid(message, 'deleted');
  });
});
