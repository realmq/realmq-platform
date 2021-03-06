const subscriptionRepository = require('../../lib/test/mocks/repositories/subscription');
const initDeleteSubscription = require('./delete-subscription');

describe('The client deleteSubscription task', () => {
  const authToken = {
    scope: 'admin',
    realmId: subscriptionRepository.knownRealmId,
  };
  const sendSubscriptionSyncMessage = jest.fn();
  let deleteSubscription;

  beforeEach(() => {
    subscriptionRepository.findOneAndDelete = jest.fn();
    deleteSubscription = initDeleteSubscription({
      subscriptionRepository,
      sendSubscriptionSyncMessage,
    });
  });

  describe('when called with non-admin scope', () => {
    it('should fail due to insufficient privileges', async () => {
      const {ok, error} = await deleteSubscription({authToken: {...authToken, scope: 'user'}});

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.code).toBe('InsufficientPrivileges');
    });
  });

  describe('when given an unknown subscription id', () => {
    it('should fail with appropriate error', async () => {
      const {ok, error} = await deleteSubscription({
        authToken,
        id: subscriptionRepository.unknownSubscriptionId,
      });

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.code).toBe('UnknownSubscription');
    });
  });

  describe('when configured correctly', () => {
    it('should delete the subscription', async () => {
      const {ok} = await deleteSubscription({
        authToken,
        id: subscriptionRepository.knownSubscriptionId,
      });

      expect(ok).toBe(true);
      expect(subscriptionRepository.findOneAndDelete).toHaveBeenCalled();
    });

    it('should send a subscription deleted sync message', async () => {
      await deleteSubscription({
        authToken,
        id: subscriptionRepository.knownSubscriptionId,
      });

      expect(sendSubscriptionSyncMessage).toHaveBeenCalled();

      const {action} = sendSubscriptionSyncMessage.mock.calls[0][0] || {};
      expect(action).toBe('deleted');
    });
  });
});
