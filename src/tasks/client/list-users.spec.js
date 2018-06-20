const userRepository = require('../../lib/test/mocks/repositories/user');
const isPaginatedList = require('../../lib/test/models/is-paginated-list');
const initListUsers = require('./list-users');

describe('The client listUsers task', () => {
  const offset = 20;
  const limit = 10;
  const authToken = {
    scope: 'admin',
    realmId: userRepository.knownRealmId,
  };
  let listUsers;

  beforeEach(() => {
    listUsers = initListUsers({userRepository});
  });

  describe('when called with non-admin scope', () => {
    it('should fail due to insufficient privileges', async () => {
      const {ok, error} = await listUsers({authToken: {...authToken, scope: 'user'}});

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.code).toBe('InsufficientPrivileges');
    });
  });

  describe('when called with admin scope', () => {
    it('should come back with a paginated list of subscriptions', async () => {
      const {ok, result} = await listUsers({authToken, offset, limit});

      expect(ok).toBe(true);
      expect(isPaginatedList(result)).toBe(true);
      expect(result.offset).toBe(offset);
      expect(result.limit).toBe(limit);
      expect(result.items[0].id).toBe(userRepository.knownUserId);
    });
  });
});
