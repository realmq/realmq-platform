const realmRepository = require('../../lib/test/mocks/repositories/realm');
const userRepository = require('../../lib/test/mocks/repositories/user');
const initListUsers = require('./list-users');

describe('The listUsers task', () => {
  let listUsers;

  beforeEach(() => {
    listUsers = initListUsers({realmRepository, userRepository});
  });

  describe('when given an invalid realm', () => {
    it('should fail with a task error and correct error code', async () => {
      const {ok, error} = await listUsers({
        realmId: realmRepository.unknownRealmId,
      });

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.isTaskError).toBe(true);
      expect(error.code).toBe('UnknownRealm');
    });
  });

  describe('when configured correctly', () => {
    it('should succeed with a list of users', async () => {
      const {ok, result, error} = await listUsers({
        realmId: realmRepository.knownRealmId,
      });

      expect(ok).toBe(true);
      expect(error).not.toBeDefined();
      expect(Array.isArray(result.items)).toBe(true);
      expect(result.total).toBeGreaterThan(0);
      expect(result.items[0].id).toBe(userRepository.knownUserId);
    });
  });
});
