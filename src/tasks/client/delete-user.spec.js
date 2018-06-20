const userRepository = require('../../lib/test/mocks/repositories/user');
const authRepository = require('../../lib/test/mocks/repositories/auth');
const subscriptionRepository = require('../../lib/test/mocks/repositories/subscription');
const initDeleteUser = require('./delete-user');

describe('The client deleteUser task', () => {
  const authToken = {
    scope: 'admin',
    realmId: userRepository.knownRealmId,
  };
  let deleteUser;

  beforeEach(() => {
    userRepository.findOneAndDelete = jest.fn();
    authRepository.deleteAllByUserId = jest.fn();
    subscriptionRepository.deleteAllByUserId = jest.fn();
    deleteUser = initDeleteUser({userRepository, authRepository, subscriptionRepository});
  });

  describe('when called with non-admin scope', () => {
    it('should fail due to insufficient privileges', async () => {
      const {ok, error} = await deleteUser({authToken: {...authToken, scope: 'user'}});

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.code).toBe('InsufficientPrivileges');
    });
  });

  describe('when given an unknown user id', () => {
    it('should fail with appropriate error', async () => {
      const {ok, error} = await deleteUser({
        authToken,
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
        authToken,
        id: userRepository.knownUserId,
      });

      expect(ok).toBe(true);
      expect(userRepository.findOneAndDelete).toHaveBeenCalled();
      expect(authRepository.deleteAllByUserId).toHaveBeenCalled();
      expect(subscriptionRepository.deleteAllByUserId).toHaveBeenCalled();
    });
  });
});
