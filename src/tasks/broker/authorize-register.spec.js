const initAuthorizeRegister = require('./authorize-register');

describe('The authorizeRegister task', () => {
  let realmLimitsRepository;
  let realtimeConnectionRepository;
  let authorizeRegister;
  const authenticatedClientId = 'authenticated-client-id';
  const unauthenticatedClientId = 'unauthenticated-client-id';

  beforeEach(() => {
    realmLimitsRepository = {
      findOneByRealmId: async () => null,
    };
    realtimeConnectionRepository = {
      countByRealmId: async () => 0,
    }
    authorizeRegister = initAuthorizeRegister({
      authenticateClient(clientId) {
        return {authenticated: clientId === authenticatedClientId};
      },
      realmLimitsRepository,
      realtimeConnectionRepository,
    });
  });

  describe('when called with an authenticated client id', () => {
    it('returns with true', async () => {
      const authenticated = await authorizeRegister(authenticatedClientId);

      expect(authenticated).toStrictEqual({authorized: true, realmLimits: null});

    });
  });

  describe('when called with an unauthenticated client id', () => {
    it('returns with false', async () => {
      const authenticated = await authorizeRegister(unauthenticatedClientId);

      expect(authenticated).toStrictEqual({authorized: false});
    });
  });
});
