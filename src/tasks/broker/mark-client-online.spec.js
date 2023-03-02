const authRepository = require('../../lib/test/mocks/repositories/auth');
const realtimeConnectionRepository = require('../../lib/test/mocks/repositories/realtime-connection');
const userRepository = require('../../lib/test/mocks/repositories/user');
const initMarkClientOnline = require('./mark-client-online');

describe('The markClientOnline task', () => {
  let markClientOnline;
  beforeEach(() => {
    authRepository.setIsOnline = jest.fn();
    userRepository.setIsOnline = jest.fn();
    realtimeConnectionRepository.create = jest.fn();
    markClientOnline = initMarkClientOnline({
      authRepository,
      realtimeConnectionRepository,
      userRepository,
    });
  });

  describe('when called with unknown clientId', () => {
    it('should fail gracefully', async () => {
      await markClientOnline(realtimeConnectionRepository.unknownClientId);
      expect(realtimeConnectionRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('when called with valid parameters', () => {
    it('should create a new realtime connection', async () => {
      await markClientOnline(realtimeConnectionRepository.knownClientId);

      expect(realtimeConnectionRepository.create).toHaveBeenCalled();
      expect(authRepository.setIsOnline).toHaveBeenCalledWith({
        realmId: realtimeConnectionRepository.knownRealmId,
        id: realtimeConnectionRepository.knownAuthId,
        isOnline: true
      });
      expect(userRepository.setIsOnline).toHaveBeenCalledWith({
        realmId: realtimeConnectionRepository.knownRealmId,
        id: realtimeConnectionRepository.knownUserId,
        isOnline: true
      });
    });
  });
});
