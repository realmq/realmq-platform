const authRepository = require('../../lib/test/mocks/repositories/auth');
const realtimeConnectionRepository = require('../../lib/test/mocks/repositories/realtime-connection');
const initDeleteAuth = require('./delete-auth');

describe('The client deleteAuth task', () => {
  const authToken = {
    scope: 'admin',
    realmId: authRepository.knownRealmId,
    userId: authRepository.knownUserId,
  };
  let deleteAuth;

  beforeEach(() => {
    authRepository.findOneAndDelete = jest.fn();
    authRepository.deleteOne = jest.fn();
    realtimeConnectionRepository.deleteMany = jest.fn();

    deleteAuth = initDeleteAuth({authRepository, realtimeConnectionRepository});
  });

  describe('when called with non-admin scope', () => {
    it('should fail due to insufficient privileges', async () => {
      const {ok, error} = await deleteAuth({authToken: {...authToken, scope: 'user'}});

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.code).toBe('InsufficientPrivileges');
    });
  });

  describe('when given an unknown auth id', () => {
    it('should fail with appropriate error', async () => {
      const {ok, error} = await deleteAuth({authToken, id: authRepository.unknownAuthId});

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.code).toBe('UnknownAuthToken');
    });
  });

  describe('when configured correctly', () => {
    it('should delete the auth token', async () => {
      const {ok} = await deleteAuth({authToken, id: authRepository.knownAuthId});

      expect(ok).toBe(true);
      expect(authRepository.deleteOne).toHaveBeenCalled();
      expect(realtimeConnectionRepository.deleteMany).toHaveBeenCalledWith({
        realmId: authToken.realmId,
        authId: authRepository.knownAuthId,
      })
    });
  });
});
