const userRepository = require('../../lib/test/mocks/repositories/user');
const realmRepository = require('../../lib/test/mocks/repositories/realm');
const authRepository = require('../../lib/test/mocks/repositories/auth');
const initCreateRealmToken = require('./create-realm-token');

describe('The createRealmToken task', () => {
  let createRealmToken;
  const validCreateRealmData = {
    realmId: realmRepository.knownRealmId,
    account: {id: realmRepository.knownAccountId},
    id: authRepository.knownAuthId,
    userId: userRepository.knownUserId,
    scope: 'user',
  };
  let authTokenRules;

  beforeEach(() => {
    authTokenRules = {
      async generateToken() {
        return authRepository.knownToken;
      },
      async buildEntity(data) {
        return {
          token: await authTokenRules.generateToken(),
          ...data,
        };
      },
    };
    createRealmToken = initCreateRealmToken({
      authTokenRules,
      realmRepository,
      userRepository,
      authRepository,
    });
  });

  describe('when given an invalid realm', () => {
    it('should fail with a task error and correct error code', async () => {
      const {ok, error} = await createRealmToken({
        ...validCreateRealmData,
        realmId: realmRepository.unknownRealmId,
      });

      expect(ok).toBe(false);
      expect(error.isTaskError).toBe(true);
      expect(error.code).toBe('UnknownRealm');
    });
  });

  describe('when having user creation failed', () => {
    it('should fail with a task error and correct error code', async () => {
      const {ok, error} = await createRealmToken({
        ...validCreateRealmData,
        userId: userRepository.failingUserId,
      });

      expect(ok).toBe(false);
      expect(error.isTaskError).toBe(true);
      expect(error.code).toBe('UserAutoCreationFailed');
    });
  });

  describe('when generated token already exists', () => {
    it('should fail with a task error and correct error code', async () => {
      authTokenRules.generateToken = () => authRepository.duplicateToken;

      const {ok, error} = await createRealmToken(validCreateRealmData);

      expect(ok).toBe(false);
      expect(error.isTaskError).toBe(true);
      expect(error.code).toBe('AuthTokenAlreadyExists');
    });
  });

  describe('when configured correctly', () => {
    it('should succeed with a token', async () => {
      const {ok, result, error} = await createRealmToken(validCreateRealmData);

      expect(ok).toBe(true);
      expect(error).not.toBeDefined();
      expect(result).toBeDefined();
      expect(result.token).toBe(authRepository.knownToken);
    });
  });
});
