const realmRepository = require('../../lib/test/mocks/repositories/realm');
const subscriptionRepository = require('../../lib/test/mocks/repositories/subscription');
const initListSubscriptions = require('./list-subscriptions');

describe('The listSubscriptions task', () => {
  let listSubscriptions;

  beforeEach(() => {
    listSubscriptions = initListSubscriptions({realmRepository, subscriptionRepository});
  });

  describe('when given an invalid realm', () => {
    it('should fail with a task error and correct error code', async () => {
      const {ok, error} = await listSubscriptions({
        realmId: realmRepository.unknownRealmId,
      });

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.isTaskError).toBe(true);
      expect(error.code).toBe('UnknownRealm');
    });
  });

  describe('when configured correctly', () => {
    it('should succeed with a list of subscriptions', async () => {
      const {ok, result, error} = await listSubscriptions({
        realmId: realmRepository.knownRealmId,
      });

      expect(ok).toBe(true);
      expect(error).not.toBeDefined();
      expect(Array.isArray(result.items)).toBe(true);
      expect(result.total).toBeGreaterThan(0);
      expect(result.items[0].id).toBe(subscriptionRepository.knownSubscriptionId);
    });
  });
});
