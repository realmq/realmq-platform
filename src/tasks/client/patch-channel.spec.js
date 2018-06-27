const channelRepository = require('../../lib/test/mocks/repositories/channel');
const initPatchChannel = require('./patch-channel');

describe('The client patchChannel task', () => {
  const authToken = {
    scope: 'admin',
    realmId: channelRepository.knownRealmId,
  };
  let patchChannel;

  beforeEach(() => {
    patchChannel = initPatchChannel({channelRepository});
  });

  describe('when called with non-admin scope', () => {
    it('should fail with InsufficientPrivileges error', async () => {
      const {ok, error} = await patchChannel({
        authToken: {authToken, scope: 'user'},
        id: channelRepository.knownChannelId,
        patch: [],
      });

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.code).toBe('InsufficientPrivileges');
    });
  });

  describe('when called with invalid patch', () => {
    it('should fail with InvalidPatch error', async () => {
      const {ok, error} = await patchChannel({
        authToken,
        id: channelRepository.knownChannelId,
        patch: {},
      });

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.code).toBe('InvalidPatch');
    });
  });

  describe('when called with an unknown channel id', () => {
    it('should fail with UnknownChannel error', async () => {
      const {ok, error} = await patchChannel({
        authToken,
        id: channelRepository.unknownChannelId,
        patch: [],
      });

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.code).toBe('UnknownChannel');
    });
  });

  describe('when called with valid patch', () => {
    describe('requesting an allowed patch', () => {
      it('should execute the patch for an allowed property', async () => {
        const patchValue = {foo: 'bar'};
        const {ok, result} = await patchChannel({
          authToken,
          id: channelRepository.knownChannelId,
          patch: [
            {op: 'replace', path: '/properties', value: patchValue},
          ],
        });

        expect(ok).toBe(true);
        expect(result.properties).toEqual(patchValue);
      });
    });

    describe('requesting an invalid patch', () => {
      it('should fail with InvalidAuthToken error', async () => {
        const {ok, error} = await patchChannel({
          authToken,
          id: channelRepository.knownChannelId,
          patch: [
            {op: 'add', path: '/foo', value: 'bar'},
          ],
        });

        expect(ok).toBe(false);
        expect(error).toBeDefined();
        expect(error.code).toBe('InvalidChannel');
      });
    });
  });
});
