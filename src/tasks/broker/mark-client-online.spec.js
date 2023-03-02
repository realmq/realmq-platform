const authRepository = require('../../lib/test/mocks/repositories/auth');
const realtimeConnectionRepository = require('../../lib/test/mocks/repositories/realtime-connection');
const initMarkClientOnline = require('./mark-client-online');

describe('The markClientOnline task', () => {
  let markClientOnline;
  beforeEach(() => {
    realtimeConnectionRepository.create = jest.fn();
    markClientOnline = initMarkClientOnline({authRepository, realtimeConnectionRepository});
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
    });
  });
});
