const initRewriteTopicToInternal = require('./rewrite-topic-to-internal');

describe('A rewriteTopicToInternal function', () => {
  describe('with valid configuration', () => {
    const client = {realmId: 'r5', userId: 'u23'};
    let rewriteTopicToInternal;
    beforeEach(() => {
      rewriteTopicToInternal = initRewriteTopicToInternal({
        rmqSysTopic: '$RMQ',
        realmTopic: 'realm',
        userTopic: 'user',
      });
    });

    it('handles plain topics', () => {
      const topic = 'plain/topic';
      const rewrittenTopic = rewriteTopicToInternal({topic, client});
      expect(rewrittenTopic).toBe('realm/r5/plain/topic');
    });
    it('handles rmq sys sync topics', () => {
      const topic = '$RMQ/sync/my/entity';
      const rewrittenTopic = rewriteTopicToInternal({topic, client});
      expect(rewrittenTopic).toBe('$RMQ/realm/r5/sync/user/u23/entity');
    });
  });
});
