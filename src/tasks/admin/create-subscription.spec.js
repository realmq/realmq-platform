const channelRepository = require('../../lib/test/mocks/repositories/channel');
const subscriptionRepository = require('../../lib/test/mocks/repositories/subscription');
const userRepository = require('../../lib/test/mocks/repositories/user');
const realmRepository = require('../../lib/test/mocks/repositories/realm');
const initCreateSubscription = require('./create-subscription');

describe('The admin createSubscription task', () => {
  const validCreateRealmData = {
    account: {
      id: realmRepository.knownAccountId,
    },
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
      channelRepository,
      userRepository,
      subscriptionRepository,
      realmRepository,
      sendSubscriptionSyncMessage,
    });
  });

  describe('when given an invalid realm', () => {
    it('should fail with a task error and correct error code', async () => {
      const {ok, error} = await createSubscription({
        ...validCreateRealmData,
        realmId: realmRepository.unknownRealmId,
      });

      expect(ok).toBe(false);
      expect(error.isTaskError).toBe(true);
      expect(error.code).toBe('UnknownRealm');
    });
  });

  describe('when given an invalid account', () => {
    it('should fail with a task error and correct error code', async () => {
      const {ok, error} = await createSubscription({
        ...validCreateRealmData,
        account: {
          id: realmRepository.unknownAccountId,
        },
      });

      expect(ok).toBe(false);
      expect(error.isTaskError).toBe(true);
      expect(error.code).toBe('UnknownRealm');
    });
  });

  describe('when called with already existing subscription id', () => {
    it('should fail with an appropriate error', async () => {
      const {ok, error} = await createSubscription({
        ...validCreateRealmData,
        id: subscriptionRepository.duplicateSubscriptionId,
      });

      expect(ok).toEqual(false);
      expect(error).toBeDefined();
      expect(error.code).toEqual('SubscriptionAlreadyExists');
    });
  });

  describe('when configured correctly', () => {
    it('should create a subscription', async () => {
      const {ok, result} = await createSubscription({...validCreateRealmData});

      expect(ok).toBe(true);
      expect(result).toBeDefined();
      expect(result.id).toBe(validCreateRealmData.id);
    });

    it('should send a subscription created sync message', async () => {
      await createSubscription({...validCreateRealmData});

      expect(sendSubscriptionSyncMessage).toHaveBeenCalled();

      const {action} = sendSubscriptionSyncMessage.mock.calls[0][0] || {};
      expect(action).toBe('created');
    });
  });
});
