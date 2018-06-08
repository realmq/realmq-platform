const initAuthenticateClient = require('./authenticate-client');

describe('The client authentication task', () => {
  const validClientId = 'valid-client-id';
  const invalidClientId = 'invalid-client-id';
  const authMock = {
    id: 'auth-id',
    realmId: 'realm-id',
    userId: 'user-id',
    scope: 'auth-scope',
  };

  let authenticateClient;

  beforeEach(() => {
    authenticateClient = initAuthenticateClient({
      authRepository: {
        async findOneByToken(token) {
          if (token === validClientId) {
            return {
              id: 'auth-id',
              realmId: 'realm-id',
              userId: 'user-id',
              scope: 'auth-scope',
            };
          }
        },
      },
    });
  });

  it('should respond with an authenticated client for a valid client id', async () => {
    const client = await authenticateClient(validClientId);

    expect(client).toBeDefined();
    expect(client.id).toEqual(validClientId);
    expect(client.authenticated).toEqual(true);
    expect(client.realmId).toEqual(authMock.realmId);
    expect(client.authTokenId).toEqual(authMock.id);
    expect(client.userId).toEqual(authMock.userId);
    expect(client.scope).toEqual(authMock.scope);
  });

  it('should respond without an unauthenticated client for an invalide client id', async () => {
    const client = await authenticateClient(invalidClientId);

    expect(client).toBeDefined();
    expect(client.authenticated).toEqual(false);
    expect(client.id).toEqual(invalidClientId);
  });
});
