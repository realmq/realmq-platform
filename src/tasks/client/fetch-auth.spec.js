const authRepository = require('../../lib/test/mocks/repositories/auth');
const initFetchAuth = require('./fetch-auth');

describe('The client fetchAuth task', () => {
  const authToken = {
    scope: 'admin',
    realmId: authRepository.knownRealmId,
  };
  let fetchAuth;

  beforeEach(() => {
    fetchAuth = initFetchAuth({authRepository});
  });

  describe('when given an unknown id', () => {
    it('should not find anything', async () => {
      const {ok, result} = await fetchAuth({authToken, id: authRepository.unknownAuthId});

      expect(ok).toBe(true);
      expect(result).toBe(null);
    });
  });

  describe('when given a known id', () => {
    it('should not find an auth', async () => {
      const {ok, result} = await fetchAuth({authToken, id: authRepository.knownAuthId});

      expect(ok).toBe(true);
      expect(result.token).toBeDefined();
    });
  });
});
