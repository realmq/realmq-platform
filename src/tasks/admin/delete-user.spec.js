const userRepository = require('../../lib/test/mocks/repositories/user');
const realmRepository = require('../../lib/test/mocks/repositories/realm');
const authRepository = require('../../lib/test/mocks/repositories/auth');
const realtimeConnectionRepository = require('../../lib/test/mocks/repositories/realtime-connection');
const subscriptionRepository = require('../../lib/test/mocks/repositories/subscription');
const initDeleteUser = require('./delete-user');

describe('The admin deleteUser task', () => {
  let deleteUser;

  beforeEach(() => {
    userRepository.deleteOne = jest.fn();
    authRepository.deleteAllByUserId = jest.fn();
    subscriptionRepository.deleteAllByUserId = jest.fn();
    realtimeConnectionRepository.deleteAllByUserId = jest.fn();
    deleteUser = initDeleteUser({
      realmRepository,
      userRepository,
      authRepository,
      subscriptionRepository,
      realtimeConnectionRepository,
    });
  });

  describe('when called with an invalid realm id', () => {
    it('should fail with appropriate error', async () => {
      const {ok, error} = await deleteUser({realmId: realmRepository.unknownRealmId, id: userRepository.knownUserId});

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.code).toBe('UnknownRealm');
    });
  });

  describe('when given an unknown user id', () => {
    it('should fail with appropriate error', async () => {
      const {ok, error} = await deleteUser({
        realmId: realmRepository.knownRealmId,
        id: userRepository.unknownUserId,
      });

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.code).toBe('UnknownUser');
    });
  });

  describe('when configured correctly', () => {
    it('should delete the user', async () => {
      const {ok} = await deleteUser({
        realmId: realmRepository.knownRealmId,
        id: userRepository.knownUserId,
      });

      expect(ok).toBe(true);
      expect(userRepository.deleteOne).toHaveBeenCalled();
      expect(authRepository.deleteAllByUserId).toHaveBeenCalled();
      expect(subscriptionRepository.deleteAllByUserId).toHaveBeenCalled();
      expect(realtimeConnectionRepository.deleteAllByUserId).toHaveBeenCalled();
    });
  });
});
