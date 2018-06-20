const userRepository = require('../../lib/test/mocks/repositories/user');
const initCreateUser = require('./create-user');

describe('The client createUser task', () => {
  const authToken = {scope: 'admin', realmId: userRepository.knownRealmId};
  const userData = {
    id: userRepository.knownUserId,
    realmId: userRepository.knownRealmId,
  };
  let createUser;

  beforeEach(() => {
    createUser = initCreateUser({userRepository});
  });

  describe('when called with non-admin scope', () => {
    it('should fail due to insufficient privileges', async () => {
      const {ok, error} = await createUser({authToken: {...authToken, scope: 'user'}});

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.code).toBe('InsufficientPrivileges');
    });
  });

  describe('when called with already existing user id', () => {
    it('should fail with an appropriate error', async () => {
      const {ok, error} = await createUser({
        authToken,
        data: {...userData, id: userRepository.duplicateUserId},
      });

      expect(ok).toEqual(false);
      expect(error).toBeDefined();
      expect(error.code).toEqual('UserAlreadyExists');
    });
  });

  describe('when configured correctly', () => {
    it('should create a user', async () => {
      const {ok, result} = await createUser({authToken, data: userData});

      expect(ok).toEqual(true);
      expect(result).toBeDefined();
      expect(result.id).toEqual(userData.id);
    });
  });
});
