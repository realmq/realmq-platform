const userRepository = require('../../lib/test/mocks/repositories/user');
const initFetchUser = require('./fetch-user');

describe('The client fetchUser task', () => {
  const authToken = {
    scope: 'admin',
    realmId: userRepository.knownRealmId,
  };
  let fetchUser;

  beforeEach(() => {
    fetchUser = initFetchUser({userRepository});
  });

  describe('when called with non-admin scope', () => {
    it('should fail due to insufficient privileges', async () => {
      const {ok, error} = await fetchUser({authToken: {...authToken, scope: 'user'}});

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.code).toBe('InsufficientPrivileges');
    });
  });

  describe('when called with an unknown user id', () => {
    it('should not come back with a user', async () => {
      const {ok, result} = await fetchUser({authToken, id: userRepository.unknownUserId});

      expect(ok).toBe(true);
      expect(result).not.toBeDefined();
    });
  });

  describe('when called with an known user id', () => {
    it('should come back with a user', async () => {
      const {ok, result} = await fetchUser({authToken, id: userRepository.knownUserId});

      expect(ok).toBe(true);
      expect(result.id).toBe(userRepository.knownUserId);
    });
  });
});
