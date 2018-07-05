const channelRepository = require('../../lib/test/mocks/repositories/channel');
const subscriptionRepository = require('../../lib/test/mocks/repositories/subscription');
const userRepository = require('../../lib/test/mocks/repositories/user');
const initCreateSubscription = require('./create-subscription');

describe('The client createSubscription task', () => {
  const authToken = {scope: 'admin', realmId: channelRepository.knownRealmId};
  const subscriptionData = {
    id: subscriptionRepository.knownSubscriptionId,
    realmId: subscriptionRepository.knownRealmId,
    userId: subscriptionRepository.knownUserId,
    channelId: subscriptionRepository.knownChannelId,
    allowRead: true,
    allowWrite: false,
  };
  const sendSubscriptionSync = jest.fn();
  let createSubscription;

  beforeEach(() => {
    createSubscription = initCreateSubscription({
      channelRepository,
      userRepository,
      subscriptionRepository,
      sendSubscriptionSync,
    });
  });

  describe('when called with non-admin scope', () => {
    it('should fail due to insufficient privileges', async () => {
      const {ok, error} = await createSubscription({authToken: {...authToken, scope: 'user'}});

      expect(ok).toEqual(false);
      expect(error).toBeDefined();
      expect(error.code).toEqual('InsufficientPrivileges');
    });
  });

  describe('when called with already existing subscription id', () => {
    it('should fail with an appropriate error', async () => {
      const {ok, error} = await createSubscription({
        authToken,
        data: {...subscriptionData, id: subscriptionRepository.duplicateSubscriptionId},
      });

      expect(ok).toEqual(false);
      expect(error).toBeDefined();
      expect(error.code).toEqual('SubscriptionAlreadyExists');
    });
  });

  describe('when configured correctly', () => {
    it('should create a subscription', async () => {
      const {ok, result} = await createSubscription({authToken, data: subscriptionData});

      expect(ok).toBe(true);
      expect(result).toBeDefined();
      expect(result.id).toBe(subscriptionData.id);
    });

    it('should send a subscription created sync message', async () => {
      await createSubscription({authToken, data: subscriptionData});

      expect(sendSubscriptionSync).toHaveBeenCalled();

      const {action} = sendSubscriptionSync.mock.calls[0][0] || {};
      expect(action).toBe('created');
    });
  });
});
