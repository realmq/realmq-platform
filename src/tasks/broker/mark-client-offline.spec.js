const realtimeConnectionRepository = require('../../lib/test/mocks/repositories/realtime-connection');
const initMarkClientOffline = require('./mark-client-offline');

describe('The markClientOffline task', () => {
  let markClientOffline;
  beforeEach(() => {
    realtimeConnectionRepository.deleteOneByClientId = jest.fn();
    markClientOffline = initMarkClientOffline({realtimeConnectionRepository});
  });

  describe('when called with unknown clientId', () => {
    it('should fail gracefully', async () => {
      await markClientOffline(realtimeConnectionRepository.unknownClientId);
    });
  });

  describe('when called with valid parameters', () => {
    it('should delete the connection for the given client id', async () => {
      await markClientOffline(realtimeConnectionRepository.knownClientId);

      expect(realtimeConnectionRepository.deleteOneByClientId).toBeCalledWith(realtimeConnectionRepository.knownClientId);
    });
  });
});
