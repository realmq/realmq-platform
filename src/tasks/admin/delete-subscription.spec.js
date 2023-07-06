const subscriptionRepository = require('../../lib/test/mocks/repositories/subscription');
const realmRepository = require('../../lib/test/mocks/repositories/realm');
const initDeleteSubscription = require('./delete-subscription');

describe('The admin deleteSubscription task', () => {
  const sendSubscriptionSyncMessage = jest.fn();
  let deleteSubscription;

  beforeEach(() => {
    subscriptionRepository.deleteOne = jest.fn();
    deleteSubscription = initDeleteSubscription({
      realmRepository,
      subscriptionRepository,
      sendSubscriptionSyncMessage,
    });
  });

  describe('when called with unknown realm id', () => {
    it('should fail with appropriate error', async () => {
      const {ok, error} = await deleteSubscription({
        realmId: realmRepository.unknownRealmId,
        id: subscriptionRepository.knownSubscriptionId,
      });

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.code).toBe('UnknownRealm');
    });
  });

  describe('when given an unknown subscription id', () => {
    it('should fail with appropriate error', async () => {
      const {ok, error} = await deleteSubscription({
        realmId: realmRepository.knownRealmId,
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
        realmId: realmRepository.knownRealmId,
        id: subscriptionRepository.knownSubscriptionId,
      });

      expect(ok).toBe(true);
      expect(subscriptionRepository.deleteOne).toHaveBeenCalled();
    });

    it('should send a subscription deleted sync message', async () => {
      const {ok, result} = await deleteSubscription({
        realmId: realmRepository.knownRealmId,
        id: subscriptionRepository.knownSubscriptionId,
      });

      expect(ok).toBe(true);
      expect(sendSubscriptionSyncMessage).toHaveBeenCalledWith({
        subscription: result,
        action: 'deleted',
      });
    });
  });
});
