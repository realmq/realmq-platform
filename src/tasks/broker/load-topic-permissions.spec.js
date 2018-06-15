const channelRepository = require('../../lib/test/mocks/repositories/channel');
const subscriptionRepository = require('../../lib/test/mocks/repositories/subscription');
const initLoadTopicPermissions = require('./load-topic-permissions');

describe('The loadTopicPermissions task', () => {
  let loadTopicPermissions;
  const topicWithStaticPermissions = 'topic-with-static-permissions';
  const staticPermissions = {read: true, write: false};
  const unavailablePermissions = {read: false, write: false};
  const validParams = {
    realmId: channelRepository.knownRealmId,
    userId: subscriptionRepository.knownUserId,
    topic: channelRepository.knownChannelId,
  };

  beforeEach(() => {
    loadTopicPermissions = initLoadTopicPermissions({
      channelRepository,
      subscriptionRepository,
      lookupStaticTopicPermissions(topic) {
        if (topic === topicWithStaticPermissions) {
          return staticPermissions;
        }
      },
    });
  });

  describe('when called with a topic that has static permissions', () => {
    it('should come back with those permissions', async () => {
      const permissions = await loadTopicPermissions({
        ...validParams,
        topic: topicWithStaticPermissions,
      });

      expect(permissions).toEqual(staticPermissions);
    });
  });

  describe('when called with unknown realm', () => {
    it('should come back with falsy persmissions', async () => {
      const permissions = await loadTopicPermissions({
        ...validParams,
        realmId: channelRepository.unknownRealmId,
      });

      expect(permissions).toEqual(unavailablePermissions);
    });
  });

  describe('when called with unknown user', () => {
    it('should come back with falsy persmissions', async () => {
      const permissions = await loadTopicPermissions({
        ...validParams,
        userId: subscriptionRepository.unknownUserId,
      });

      expect(permissions).toEqual(unavailablePermissions);
    });
  });

  describe('when called with valid parameters', () => {
    it('should come back with expected permissions', async () => {
      const permissions = await loadTopicPermissions(validParams);

      expect(permissions).toEqual({read: true, write: true});
    });
  });
});
