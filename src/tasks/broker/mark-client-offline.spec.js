const authRepository = require('../../lib/test/mocks/repositories/auth');
const initMarkClientOffline = require('./mark-client-offline');

describe('The markClientOffline task', () => {
  let markClientOffline;
  beforeEach(() => {
    markClientOffline = initMarkClientOffline({authRepository});
  });

  describe('when called with unknown clientId', () => {
    it('should fail gracefully and not return anything', async () => {
      const auth = await markClientOffline(authRepository.unknownToken);

      expect(auth).toBeUndefined();
    });
  });

  describe('when called with valid parameters', () => {
    it('should return with the auth having the presence updated', async () => {
      const auth = {isOnline: true};
      markClientOffline = initMarkClientOffline({
        authRepository: {
          ...authRepository,
          findOneByToken() {
            return auth;
          },
        },
      });

      await markClientOffline(authRepository.knownToken);

      expect(auth.isOnline).toBe(false);
    });
  });
});
