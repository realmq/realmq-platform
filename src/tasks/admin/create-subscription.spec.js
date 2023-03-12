const channelRepository = require('../../lib/test/mocks/repositories/channel');
const subscriptionRepository = require('../../lib/test/mocks/repositories/subscription');
const realmRepository = require('../../lib/test/mocks/repositories/realm');
const userRepository = require('../../lib/test/mocks/repositories/user');
const initCreateSubscription = require('./create-subscription');

describe('The client createSubscription task', () => {
  const subscriptionData = {
    id: subscriptionRepository.knownSubscriptionId,
    realmId: subscriptionRepository.knownRealmId,
    userId: subscriptionRepository.knownUserId,
    channelId: subscriptionRepository.knownChannelId,
    allowRead: true,
    allowWrite: false,
  };
  const sendSubscriptionSyncMessage = jest.fn();
  let createSubscription;

  beforeEach(() => {
    createSubscription = initCreateSubscription({
      realmRepository,
      channelRepository,
      userRepository,
      subscriptionRepository,
      sendSubscriptionSyncMessage,
    });
  });

  describe('when given an invalid realm', () => {
    it('should fail with a task error and correct error code', async () => {
      const {ok, error} = await createSubscription({
        ...subscriptionData,
        realmId: realmRepository.unknownRealmId,
      });

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.isTaskError).toBe(true);
      expect(error.code).toBe('UnknownRealm');
    });
  });

  describe('when called with already existing subscription id', () => {
    it('should fail with an appropriate error', async () => {
      const {ok, error} = await createSubscription({
        ...subscriptionData,
        id: subscriptionRepository.duplicateSubscriptionId
      });

      expect(ok).toEqual(false);
      expect(error).toBeDefined();
      expect(error.code).toEqual('SubscriptionAlreadyExists');
    });
  });

  describe('when configured correctly', () => {
    it('should create a subscription', async () => {
      const {ok, result} = await createSubscription({...subscriptionData});

      expect(ok).toBe(true);
      expect(result).toBeDefined();
      expect(result.id).toBe(subscriptionData.id);
    });

    it('should send a subscription created sync message', async () => {
      await createSubscription({...subscriptionData});

      expect(sendSubscriptionSyncMessage).toHaveBeenCalled();

      const {action, subscription} = sendSubscriptionSyncMessage.mock.calls[0][0] || {};
      expect(subscription).toMatchObject(subscriptionData);
      expect(action).toBe('created');
    });
  });
});
