const realmRepository = require('../../lib/test/mocks/repositories/realm');
const channelRepository = require('../../lib/test/mocks/repositories/channel');
const initListChannels = require('./list-channels');

describe('The listRealmTokens task', () => {
  let listChannels;

  beforeEach(() => {
    listChannels = initListChannels({realmRepository, channelRepository});
  });

  describe('when given an invalid realm', () => {
    it('should fail with a task error and correct error code', async () => {
      const {ok, error} = await listChannels({
        realmId: realmRepository.unknownRealmId,
        account: {id: realmRepository.knownAccountId},
      });

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.isTaskError).toBe(true);
      expect(error.code).toBe('UnknownRealm');
    });
  });

  describe('when configured correctly', () => {
    it('should succeed with a list of channels', async () => {
      const {ok, result, error} = await listChannels({
        realmId: realmRepository.knownRealmId,
        account: {id: realmRepository.knownAccountId},
      });

      expect(ok).toBe(true);
      expect(error).not.toBeDefined();
      expect(Array.isArray(result.items)).toBe(true);
      expect(result.total).toBeGreaterThan(0);
      expect(result.items[0].id).toBe(channelRepository.knownChannelId);
    });
  });
});
