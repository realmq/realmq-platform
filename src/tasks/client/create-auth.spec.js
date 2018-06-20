const authRepository = require('../../lib/test/mocks/repositories/auth');
const userRepository = require('../../lib/test/mocks/repositories/user');
const initCreateAuth = require('./create-auth');

describe('The client createAuth module', () => {
  const authToken = {scope: 'admin', realmId: authRepository.knownRealmId};
  const authData = {
    realmId: authRepository.knownRealmId,
    userId: authRepository.knownUserId,
  };
  let createAuth;

  beforeEach(() => {
    createAuth = initCreateAuth({
      authRepository,
      userRepository,
      authTokenRules: {
        async buildEntity(data) {
          return {
            ...data,
            token: authRepository.knownToken,
          };
        },
      },
    });
  });

  describe('when called with non-admin scope', () => {
    it('should fail due to insufficient privileges', async () => {
      const {ok, error} = await createAuth({authToken: {...authToken, scope: 'user'}});

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.code).toBe('InsufficientPrivileges');
    });
  });

  describe('when creating a duplicate auth token', () => {
    it('should fail with an appropriate error', async () => {
      createAuth = initCreateAuth({
        authRepository,
        userRepository,
        authTokenRules: {
          async buildEntity(data) {
            return {
              ...data,
              token: authRepository.duplicateToken,
            };
          },
        },
      });

      const {ok, error} = await createAuth({authToken, data: authData});

      expect(ok).toBe(false);
      expect(error.code).toBe('AuthTokenAlreadyExists');
    });
  });

  describe('when configured correctly', () => {
    it('should create an auth', async () => {
      const {ok, result} = await createAuth({authToken, data: authData});

      expect(ok).toBe(true);
      expect(result).toBeDefined();
      expect(result.token).toBe(authRepository.knownToken);
    });
  });
});
