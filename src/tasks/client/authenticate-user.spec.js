const authRepository = require('../../lib/test/mocks/repositories/auth');
const userRepository = require('../../lib/test/mocks/repositories/user');
const initAuthenticateUser = require('./authenticate-user');

describe('The client authenticateUser task', () => {
  let authenticateUser;

  beforeEach(() => {
    authenticateUser = initAuthenticateUser({userRepository, authRepository});
  });

  describe('when called with an unknown token', () => {
    it('should not authenticate', async () => {
      const {ok, result: {authenticated}} = await authenticateUser({
        token: authRepository.unknownToken,
      });

      expect(ok).toBe(true);
      expect(authenticated).toBe(false);
    });
  });

  describe('when called with a token for an unknown user', () => {
    it('should not authenticate', async () => {
      const unknownUserRepository = {
        ...userRepository,
        findOne: async () => {
          return null;
        },
      };
      authenticateUser = initAuthenticateUser({
        userRepository: unknownUserRepository,
        authRepository,
      });

      const {ok, result: {authenticated}} = await authenticateUser({
        token: authRepository.knownToken,
      });

      expect(ok).toBe(true);
      expect(authenticated).toBe(false);
    });
  });

  describe('when called with a valid token for a known user', () => {
    it('should authenticate and contain user and auth model in result', async () => {
      const {ok, result: {authenticated, user, auth}} = await authenticateUser({
        token: authRepository.knownToken,
      });

      expect(ok).toBe(true);
      expect(authenticated).toBe(true);
      expect(user).toBeDefined();
      expect(auth).toBeDefined();
    });
  });
});
