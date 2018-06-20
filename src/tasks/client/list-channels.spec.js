const channelRepository = require('../../lib/test/mocks/repositories/channel');
const subscriptionRepository = require('../../lib/test/mocks/repositories/subscription');
const isPaginatedList = require('../../lib/test/models/is-paginated-list');
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
    channelRepository.find = jest.fn(channelRepository.find);
    listChannels = initListChannels({subscriptionRepository, channelRepository});
  });

  describe('when called with admin scope', () => {
    it('should come back with a paginated list of channels of all users', async () => {
      const {ok, result} = await listChannels({authToken, offset, limit});

      const mockedFindChannelsCallParams = channelRepository.find.mock.calls[0][0];

      expect(ok).toBe(true);
      expect(isPaginatedList(result)).toBe(true);
      expect(result.offset).toBe(offset);
      expect(result.limit).toBe(limit);
      expect(channelRepository.find).toHaveBeenCalled();
      expect(mockedFindChannelsCallParams.realmId).toBeDefined();
      expect(mockedFindChannelsCallParams.userId).not.toBeDefined();
    });
  });

  describe('when called with user scope', () => {
    describe('when user has no subscriptions', () => {
      it('should come back with an empty paginated list', async () => {
        const {ok, result} = await listChannels({
          authToken: {...authToken, scope: 'user'},
          user: {id: subscriptionRepository.unknownUserId},
          offset,
          limit,
        });

        expect(ok).toBe(true);
        expect(isPaginatedList(result)).toBe(true);
        expect(result.items.length).toBe(0);
        expect(result.offset).toBe(offset);
        expect(result.limit).toBe(limit);
      });
    });

    describe('when user has subscriptions', () => {
      it('should come back with a paginated list of channels', async () => {
        const {ok, result} = await listChannels({
          authToken: {...authToken, scope: 'user'},
          user: {id: subscriptionRepository.knownUserId},
          offset,
          limit,
        });

        expect(ok).toBe(true);
        expect(isPaginatedList(result)).toBe(true);
        expect(result.items.length).toBeGreaterThan(0);
        expect(result.offset).toBe(offset);
        expect(result.limit).toBe(limit);
      });
    });
  });
});
