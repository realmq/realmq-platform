const authRepository = require('../../lib/test/mocks/repositories/auth');
const initMarkClientOnline = require('./mark-client-online');

describe('The markClientOnline task', () => {
  let markClientOnline;
  beforeEach(() => {
    markClientOnline = initMarkClientOnline({authRepository});
  });

  describe('when called with unknown clientId', () => {
    it('should fail gracefully and not return anything', async () => {
      const auth = await markClientOnline(authRepository.unknownToken);

      expect(auth).toBeUndefined();
    });
  });

  describe('when called with valid parameters', () => {
    it('should return with the auth having the presence updated', async () => {
      const auth = {isOnline: false};
      markClientOnline = initMarkClientOnline({
        authRepository: {
          ...authRepository,
          findOneByToken() {
            return auth;
          },
        },
      });

      await markClientOnline(authRepository.knownToken);

      expect(auth.isOnline).toBe(true);
    });
  });
});
