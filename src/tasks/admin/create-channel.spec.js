const channelRepository = require('../../lib/test/mocks/repositories/channel');
const realmRepository = require('../../lib/test/mocks/repositories/realm');
const initCreateChannel = require('./create-channel');

describe('The createChannel task', () => {
  let createChannel;
  const validCreateChannelData = {
    realmId: channelRepository.knownRealmId,
    id: channelRepository.knownChannelId,
    account: {id: realmRepository.knownAccountId},
  };

  beforeEach(() => {
    createChannel = initCreateChannel({
      realmRepository,
      channelRepository,
    });
  });

  describe('when given an invalid realm', () => {
    it('should fail with a task error and correct error code', async () => {
      const {ok, error} = await createChannel({
        ...validCreateChannelData,
        realmId: realmRepository.unknownRealmId,
      });

      expect(ok).toBe(false);
      expect(error.isTaskError).toBe(true);
      expect(error.code).toBe('UnknownRealm');
    });
  });

  describe('when channel already exists', () => {
    it('should fail with a task error and correct error code', async () => {
      const {ok, error} = await createChannel({...validCreateChannelData, id: channelRepository.duplicateChannelId});

      expect(ok).toBe(false);
      expect(error.isTaskError).toBe(true);
      expect(error.code).toBe('ChannelAlreadyExists');
    });
  });

  describe('when configured correctly', () => {
    it('should succeed with a channel', async () => {
      const {ok, result, error} = await createChannel(validCreateChannelData);

      expect(ok).toBe(true);
      expect(error).not.toBeDefined();
      expect(result).toBeDefined();
      expect(result.id).toBe(channelRepository.knownChannelId);
    });
  });
});
