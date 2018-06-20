const subscriptionRepository = require('../../lib/test/mocks/repositories/subscription');
const initDeleteSubscription = require('./delete-subscription');

describe('The client deleteSubscription task', () => {
  const authToken = {
    scope: 'admin',
    realmId: subscriptionRepository.knownRealmId,
  };
  let deleteSubscription;

  beforeEach(() => {
    subscriptionRepository.findOneAndDelete = jest.fn();
    deleteSubscription = initDeleteSubscription({subscriptionRepository});
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
  });
});
