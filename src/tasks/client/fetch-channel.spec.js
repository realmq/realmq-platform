const channelRepository = require('../../lib/test/mocks/repositories/channel');
const subscriptionRepository = require('../../lib/test/mocks/repositories/subscription');
const initFetchChannel = require('./fetch-channel');

describe('The client fetchChannel task', () => {
  const authToken = {
    scope: 'admin',
    realmId: channelRepository.knownRealmId,
  };
  let fetchChannel;

  beforeEach(() => {
    fetchChannel = initFetchChannel({channelRepository, subscriptionRepository});
  });

  describe('when calling with admin scope', () => {
    it('should fetch the channel', async () => {
      const {ok, result} = await fetchChannel({authToken, id: channelRepository.knownChannelId});

      expect(ok).toBe(true);
      expect(result.id).toBe(channelRepository.knownChannelId);
    });
  });

  describe('when calling with user scope', () => {
    it('should fetch the channel the user has access to', async () => {
      const {ok, result} = await fetchChannel({
        authToken: {...authToken, scope: 'user'},
        id: channelRepository.knownChannelId,
      });

      expect(ok).toBe(true);
      expect(result.id).toBe(channelRepository.knownChannelId);
    });

    it('must not fetch a channel the user doesn\'t have access to', async () => {
      fetchChannel = initFetchChannel({
        channelRepository,
        subscriptionRepository: {
          ...subscriptionRepository,
          async findOne() {
            return null;
          },
        },
      });

      const {ok, result} = await fetchChannel({
        authToken: {...authToken, scope: 'user'},
        id: channelRepository.knownChannelId,
      });

      expect(ok).toBe(true);
      expect(result).toBe(null);
    });
  });
});

