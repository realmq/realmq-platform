const channelRepository = require('../../lib/test/mocks/repositories/channel');
const initCreateChannel = require('./create-channel');

describe('The client createChannel task', () => {
  const authToken = {scope: 'admin', realmId: channelRepository.knownRealmId};
  const channelData = {
    id: channelRepository.knownChannelId,
    realmId: channelRepository.knownRealmId,
  };
  let createChannel;

  beforeEach(() => {
    createChannel = initCreateChannel({channelRepository});
  });

  describe('when called with non-admin scope', () => {
    it('should fail due to insufficient privileges', async () => {
      const {ok, error} = await createChannel({authToken: {...authToken, scope: 'user'}});

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.code).toBe('InsufficientPrivileges');
    });
  });

  describe('when called with already existing channel id', () => {
    it('should fail with an appropriate error', async () => {
      const {ok, error} = await createChannel({
        authToken,
        data: {...channelData, id: channelRepository.duplicateChannelId},
      });

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.code).toBe('ChannelAlreadyExists');
    });
  });

  describe('when configured correctly', () => {
    it('should create a channel', async () => {
      const {ok, result} = await createChannel({authToken, data: channelData});

      expect(ok).toBe(true);
      expect(result.id).toBe(channelData.id);
    });
  });
});
