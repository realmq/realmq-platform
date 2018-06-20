const channelRepository = require('../../lib/test/mocks/repositories/channel');
const initDeleteChannel = require('./delete-channel');

describe('The client deleteChannel task', () => {
  const authToken = {
    scope: 'admin',
    realmId: channelRepository.knownRealmId,
  };
  let deleteChannel;

  beforeEach(() => {
    channelRepository.findOneAndDelete = jest.fn();
    deleteChannel = initDeleteChannel({channelRepository});
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
  });
});
