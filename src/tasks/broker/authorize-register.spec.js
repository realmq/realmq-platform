const initAuthorizeRegister = require('./authorize-register');

describe('The authorizeRegister task', () => {
  let authorizeRegister;
  const authenticatedClientId = 'authenticated-client-id';
  const unauthenticatedClientId = 'unauthenticated-client-id';

  beforeEach(() => {
    authorizeRegister = initAuthorizeRegister({
      authenticateClient(clientId) {
        return {authenticated: clientId === authenticatedClientId};
      },
    });
  });

  describe('when called with an authenticated client id', () => {
    it('returns with true', async () => {
      const authenticated = await authorizeRegister(authenticatedClientId);

      expect(authenticated).toBe(true);
    });
  });

  describe('when called with an unauthenticated client id', () => {
    it('returns with false', async () => {
      const authenticated = await authorizeRegister(unauthenticatedClientId);

      expect(authenticated).toBe(false);
    });
  });
});
