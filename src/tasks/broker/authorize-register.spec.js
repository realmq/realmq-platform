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
    };
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

    describe('of an realm with max connection limit', () => {
      describe.each([
        ['and limit is not reached', 10, 9, true],
        ['and limit is reached', 10, 10, false],
      ])(
        '%s',
        (description, maxConnections, numberOfRealmConnections, expectedAuthorized) => {
          beforeEach(() => {
            realmLimitsRepository.findOneByRealmId = async () => ({maxConnections});
            realtimeConnectionRepository.countByRealmId = async () => numberOfRealmConnections;
          });

          it(`returns with ${expectedAuthorized ? 'true' : 'false'}`, async () => {
            const authenticated = await authorizeRegister(authenticatedClientId);

            expect(authenticated).toMatchObject({
              authorized: expectedAuthorized,
            });
          });
        },
      );
    });
  });

  describe('when called with an unauthenticated client id', () => {
    it('returns with false', async () => {
      const authenticated = await authorizeRegister(unauthenticatedClientId);

      expect(authenticated).toStrictEqual({authorized: false});
    });
  });
});
