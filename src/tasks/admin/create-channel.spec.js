const realmRepository = require('../../lib/test/mocks/repositories/realm');
const channelRepository = require('../../lib/test/mocks/repositories/channel');
const initCreateChannel = require('./create-channel');

describe('A createChannel admin task', () => {
  describe('with proper configuration', () => {
    let createChannel;

    beforeEach(() => {
      createChannel = initCreateChannel({channelRepository, realmRepository});
    });

    describe('when given an invalid realm', () => {
      it('should fail with a task error and correct error code', async () => {
        const {ok, error} = await createChannel({
          realmId: realmRepository.unknownRealmId,
        });

        expect(ok).toBe(false);
        expect(error).toBeDefined();
        expect(error.isTaskError).toBe(true);
        expect(error.code).toBe('UnknownRealm');
      });
    });

    describe('when given an existent channel id', () => {
      it('should fail with a task error and correct error code', async () => {
        const {ok, error} = await createChannel({
          realmId: realmRepository.knownRealmId,
          id: channelRepository.duplicateChannelId,
        });

        expect(ok).toBe(false);
        expect(error).toBeDefined();
        expect(error.isTaskError).toBe(true);
        expect(error.code).toBe('ChannelAlreadyExists');
      });
    });

    describe('when configured correctly', () => {
      it('should succeed with a created channel', async () => {
        const {ok, result, error} = await createChannel({
          realmId: realmRepository.knownRealmId,
          id: channelRepository.unknownChannelId,
        });

        expect(ok).toBe(true);
        expect(error).not.toBeDefined();
        expect(result).toMatchObject({
          realmId: realmRepository.knownRealmId,
          id: channelRepository.unknownChannelId,
          properties: {},
        });
      });
    });
  });
});
