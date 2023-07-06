const channelRepository = require('../../lib/test/mocks/repositories/channel');
const realmRepository = require('../../lib/test/mocks/repositories/realm');
const messageRepository = require('../../lib/test/mocks/repositories/message');
const subscriptionRepository = require('../../lib/test/mocks/repositories/subscription');
const initDeleteChannel = require('./delete-channel');

describe('The client deleteChannel task', () => {
  let deleteChannel;

  beforeEach(() => {
    channelRepository.deleteOne = jest.fn();
    messageRepository.deleteAllByChannelId = jest.fn();
    subscriptionRepository.deleteAllByChannelId = jest.fn();
    deleteChannel = initDeleteChannel({
      realmRepository,
      messageRepository,
      channelRepository,
      subscriptionRepository,
    });
  });

  describe('when called with unknown realm id', () => {
    it('should fail with appropriate error', async () => {
      const {ok, error} = await deleteChannel({realmId: realmRepository.unknownRealmId, id: channelRepository.knownChannelId});

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.code).toBe('UnknownRealm');
    });
  });

  describe('when given an unknown channel id', () => {
    it('should fail with appropriate error', async () => {
      const {ok, error} = await deleteChannel({
        realmId: realmRepository.knownRealmId,
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
        realmId: realmRepository.knownRealmId,
        id: channelRepository.knownChannelId,
      });

      expect(ok).toBe(true);
      expect(channelRepository.deleteOne).toHaveBeenCalled();
    });

    it('should delete all subscriptions on a channel', async () => {
      const subscription = subscriptionRepository.validSubscription;
      await deleteChannel({
        realmId: subscription.realmId,
        id: subscription.channelId,
      });

      const deleteMethod = subscriptionRepository.deleteAllByChannelId;
      expect(deleteMethod).toHaveBeenCalledWith({
        realmId: subscription.realmId,
        channelId: subscription.channelId,
      });
    });

    it('should delete all messages on a channel', async () => {
      const message = messageRepository.validMessage;
      await deleteChannel({
        realmId: message.realmId,
        id: message.channelId,
      });

      const deleteMethod = messageRepository.deleteAllByChannelId;
      expect(deleteMethod).toHaveBeenCalledWith({
        realmId: message.realmId,
        channelId: message.channelId,
      });
    });
  });
});
