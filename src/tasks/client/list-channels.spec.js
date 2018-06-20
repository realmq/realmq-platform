const channelRepository = require('../../lib/test/mocks/repositories/channel');
const subscriptionRepository = require('../../lib/test/mocks/repositories/subscription');
const initListChannels = require('./list-channels');

describe('The client listChannels task', () => {
  const offset = 20;
  const limit = 10;
  const authToken = {
    scope: 'admin',
    realmId: channelRepository.knownRealmId,
  };
  let listChannels;

  beforeEach(() => {
    listChannels = initListChannels({subscriptionRepository, channelRepository});
  });

  describe('when called with admin scope', () => {
    it('should come back with a paginated list of channels', async () => {
      const {ok, result} = await listChannels({authToken, offset, limit});

      expect(ok).toBe(true);
      expect(Array.isArray(result.items)).toBe(true);
      expect(result.offset).toBe(offset);
      expect(result.limit).toBe(limit);
    });
  });
});
