const messageRepository = require('../../lib/test/mocks/repositories/message');
const channelRepository = require('../../lib/test/mocks/repositories/channel');
const channelModel = require('../../models/channel');
const logger = require('../../lib/test/mocks/noop-logger');
const initRecordMessage = require('./record-message');

const assembleTopic = (realmId, channelId) => `realm/${realmId}/${channelId}`;

describe('The broker recordMessage task', () => {
  const channelIdWithoutPersistence = 'channel-without-persistence';
  const channelIdWithPersistence = 'channel-with-persistence';
  const channelIdWithZeroDurationPersistence = 'channel-with-zero-duration-persistence';
  let recordMessage;

  beforeEach(() => {
    messageRepository.create = jest.fn(messageRepository.create);
    recordMessage = initRecordMessage({
      logger,
      messageRepository,
      channelRepository: {
        ...channelRepository,
        findOne: async ({realmId, id}) => {
          if (id === channelRepository.unknownChannelId) {
            return null;
          }

          const features = {};

          if (id === channelIdWithoutPersistence) {
            features.persistence = {enabled: false};
          } else if (id === channelIdWithPersistence) {
            features.persistence = {enabled: true};
          } else if (id === channelIdWithZeroDurationPersistence) {
            features.persistence = {enabled: true, duration: '0d'};
          }

          return channelModel({
            realmId,
            id,
            features,
            updatedAt: new Date(),
            createdAt: new Date(),
          });
        },
      },
    });
  });

  describe('when called with RMQ sys topic', () => {
    it('should not persist', async () => {
      const topic = `$RMQ/realm/some-realm-id/some/topic`;
      await recordMessage({topic, message: 'foobar'});

      expect(messageRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('when called with unknown channel topic', () => {
    it('should not persist', async () => {
      const topic = assembleTopic(
        channelRepository.knownRealmId,
        channelRepository.unknownChannelId
      );
      await recordMessage({topic, message: 'foobar'});

      expect(messageRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('when called with topic for channel without persistence', () => {
    it('should not persist', async () => {
      const topic = assembleTopic(
        channelRepository.knownRealmId,
        channelIdWithoutPersistence
      );
      await recordMessage({topic, message: 'foobar'});

      expect(messageRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('when called with topic for channel with zero duraction persistence', () => {
    it('should not persist', async () => {
      const topic = assembleTopic(
        channelRepository.knownRealmId,
        channelIdWithZeroDurationPersistence
      );
      await recordMessage({topic, message: 'foobar'});

      expect(messageRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('when called with topic for channel with duraction persistence', () => {
    it('should persist', async () => {
      const topic = assembleTopic(
        channelRepository.knownRealmId,
        channelIdWithPersistence
      );
      await recordMessage({topic, message: 'foobar'});

      expect(messageRepository.create).toHaveBeenCalled();
    });
  });
});
