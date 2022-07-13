const realmRepository = require('../../lib/test/mocks/repositories/realm');
const authRepository = require('../../lib/test/mocks/repositories/auth');
const initListRealmTokens = require('./list-realm-tokens');

describe('The listRealmTokens task', () => {
  let listRealmTokens;

  beforeEach(() => {
    listRealmTokens = initListRealmTokens({realmRepository, authRepository});
  });

  describe('when given an invalid realm', () => {
    it('should fail with a task error and correct error code', async () => {
      const {ok, error} = await listRealmTokens({
        realmId: realmRepository.unknownRealmId,
      });

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.isTaskError).toBe(true);
      expect(error.code).toBe('UnknownRealm');
    });
  });

  describe('when configured correctly', () => {
    it('should succeed with a list of auth tokens', async () => {
      const {ok, result, error} = await listRealmTokens({
        realmId: realmRepository.knownRealmId,
      });

      expect(ok).toBe(true);
      expect(error).not.toBeDefined();
      expect(Array.isArray(result.items)).toBe(true);
      expect(result.total).toBeGreaterThan(0);
      expect(result.items[0].token).toBe(authRepository.knownToken);
    });
  });
});
