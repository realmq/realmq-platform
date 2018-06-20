const subscriptionRepository = require('../../lib/test/mocks/repositories/subscription');
const initFetchSubscription = require('./fetch-subscription');

describe('The client fetchSubscription task', () => {
  const authToken = {
    scope: 'admin',
    realmId: subscriptionRepository.knownRealmId,
    userId: subscriptionRepository.knownUserId,
  };
  let fetchSubscription;

  beforeEach(() => {
    fetchSubscription = initFetchSubscription({subscriptionRepository});
  });

  describe('when given an unknown id', () => {
    it('should not fetch a subscription', async () => {
      const {ok, result} = await fetchSubscription({
        authToken,
        id: subscriptionRepository.unknownSubscriptionId,
      });

      expect(ok).toBe(true);
      expect(result).not.toBeDefined();
    });
  });

  describe('when given an known id', () => {
    it('should fetch a subscription', async () => {
      const {ok, result} = await fetchSubscription({
        authToken,
        id: subscriptionRepository.knownSubscriptionId,
      });

      expect(ok).toBe(true);
      expect(result.id).toBe(subscriptionRepository.knownSubscriptionId);
    });
  });

  describe('when called in non-admin scope', () => {
    it('should not fetch a subscription that\'s not accessible by the user', async () => {
      const {ok, result} = await fetchSubscription({
        authToken: {
          ...authToken,
          scope: 'user',
          userId: subscriptionRepository.unknownUserId,
        },
        id: subscriptionRepository.knownSubscriptionId,
      });

      expect(ok).toBe(true);
      expect(result).not.toBeDefined();
    });
  });
});
