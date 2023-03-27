const authRepository = require('../../lib/test/mocks/repositories/auth');
const realtimeConnectionRepository = require('../../lib/test/mocks/repositories/realtime-connection');
const realmRepository = require('../../lib/test/mocks/repositories/realm');
const initDeleteToken = require('./delete-token');

describe('The admin deleteToken task', () => {
  let deleteToken;

  beforeEach(() => {
    authRepository.deleteOne = jest.fn();
    realtimeConnectionRepository.deleteAllByAuthId = jest.fn();

    deleteToken = initDeleteToken({
      authRepository,
      realmRepository,
      realtimeConnectionRepository,
    });
  });

  describe('when given an unknown realmId id', () => {
    it('should fail with appropriate error', async () => {
      const {ok, error} = await deleteToken({realmId: realmRepository.unknownRealmId, id: authRepository.knownAuthId});

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.code).toBe('UnknownRealm');
    });
  });

  describe('when given an unknown token id', () => {
    it('should fail with appropriate error', async () => {
      const {ok, error} = await deleteToken({realmId: realmRepository.knownRealmId, id: authRepository.unknownAuthId});

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.code).toBe('UnknownAuthToken');
    });
  });

  describe('when configured correctly', () => {
    it('should delete the auth token', async () => {
      const {ok, result} = await deleteToken({realmId: realmRepository.knownRealmId, id: authRepository.knownAuthId});

      expect(ok).toBe(true);
      expect(authRepository.deleteOne).toHaveBeenCalled();
      expect(realtimeConnectionRepository.deleteAllByAuthId).toHaveBeenCalledWith({
        realmId: realmRepository.knownRealmId,
        authId: authRepository.knownAuthId,
      });
      expect(result).toMatchObject(authRepository.validAuth);
    });
  });
});
