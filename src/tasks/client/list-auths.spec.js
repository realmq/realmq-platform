const authRepository = require('../../lib/test/mocks/repositories/auth');
const initListAuths = require('./list-auths');

describe('The client listAuths task', () => {
  const authToken = {
    scope: 'admin',
    realmId: authRepository.knownRealmId,
    userId: authRepository.knownUserId,
  };
  let listAuths;

  beforeEach(() => {
    listAuths = initListAuths({authRepository});
  });

  it('should fetch a list of auth object', async () => {
    const {ok, result} = await listAuths({authToken});

    expect(ok).toBe(true);
    expect(Array.isArray(result.items)).toBe(true);
    expect(result.items[0].id).toBe(authRepository.knownAuthId);
  });
});
