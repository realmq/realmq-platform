const channelRepository = require('../../lib/test/mocks/repositories/channel');
const subscriptionRepository = require('../../lib/test/mocks/repositories/subscription');
const initDeleteChannel = require('./delete-channel');

describe('The client deleteChannel task', () => {
  const authToken = {
    scope: 'admin',
    realmId: channelRepository.knownRealmId,
  };
  let deleteChannel;

  beforeEach(() => {
    channelRepository.findOneAndDelete = jest.fn();
    subscriptionRepository.deleteAllByChannelId = jest.fn();
    deleteChannel = initDeleteChannel({channelRepository, subscriptionRepository});
  });

  describe('when called with non-admin scope', () => {
    it('should fail due to insufficient privileges', async () => {
      const {ok, error} = await deleteChannel({authToken: {...authToken, scope: 'user'}});

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.code).toBe('InsufficientPrivileges');
    });
  });

  describe('when given an unknown channel id', () => {
    it('should fail with appropriate error', async () => {
      const {ok, error} = await deleteChannel({
        authToken,
        id: channelRepository.unknownChannelId,
      });

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.code).toBe('UnknownChannel');
    });
  });

  describe('when configured correctly', () => {
    it('should delete the channel', async () => {
      const {ok} = await deleteChannel({
        authToken,
        id: channelRepository.knownChannelId,
      });

      expect(ok).toBe(true);
      expect(channelRepository.findOneAndDelete).toHaveBeenCalled();
    });

    it('should delete all subscriptions on a channel', async () => {
      const subscription = subscriptionRepository.validSubscription;
      await deleteChannel({
        authToken,
        id: subscription.channelId,
      });

      const deleteMethod = subscriptionRepository.deleteAllByChannelId;
      expect(deleteMethod).toHaveBeenCalled();

      const {realmId, channelId} = deleteMethod.mock.calls[0][0];
      expect(realmId).toBe(subscription.realmId);
      expect(channelId).toBe(subscription.channelId);
    });
  });
});
