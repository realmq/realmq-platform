const initAuthorizePublish = require('./authorize-publish');

const rewriteTopicToInternal
  = ({client: {realmId, userId}, topic}) => `${realmId}-${userId}-${topic}`;

describe('The authorizePublish task', () => {
  const writableTopic = 'writable-topic';
  const unwritableTopic = 'unwritable-topic';
  const client = {realmId: 'realmId', userId: 'userId'};
  let authorizePublish;

  beforeEach(() => {
    authorizePublish = initAuthorizePublish({
      loadTopicPermissions: async ({topic}) => ({write: topic === writableTopic}),
      rewriteTopicToInternal,
    });
  });

  describe('when called with a writable topic', () => {
    it('authorizes and comes back with internal topic', async () => {
      const {authorized, internalTopic} = await authorizePublish(client, writableTopic);

      expect(authorized).toBe(true);
      expect(internalTopic).toBe(rewriteTopicToInternal({topic: writableTopic, client}));
    });
  });

  describe('when called with an unwritable topic', () => {
    it('does not authorize', async () => {
      const {authorized} = await authorizePublish(client, unwritableTopic);

      expect(authorized).toBe(false);
    });
  });
});
