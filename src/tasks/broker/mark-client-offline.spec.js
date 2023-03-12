const authRepository = require('../../lib/test/mocks/repositories/auth');
const realtimeConnectionRepository = require('../../lib/test/mocks/repositories/realtime-connection');
const userRepository = require('../../lib/test/mocks/repositories/user');
const initMarkClientOffline = require('./mark-client-offline');

describe('The markClientOffline task', () => {
  let markClientOffline;
  beforeEach(() => {
    realtimeConnectionRepository.findOneAndDeleteByClientId = jest.fn();
    markClientOffline = initMarkClientOffline({
      realtimeConnectionRepository,
      authRepository,
      userRepository,
    });
  });

  describe('when called with unknown clientId', () => {
    it('should fail gracefully', async () => {
      await markClientOffline(realtimeConnectionRepository.unknownClientId);
    });
  });

  describe('when called with valid parameters', () => {
    it('should delete the connection for the given client id', async () => {
      await markClientOffline(realtimeConnectionRepository.knownClientId);

      expect(realtimeConnectionRepository.findOneAndDeleteByClientId).toBeCalledWith(realtimeConnectionRepository.knownClientId);
    });
  });
});
