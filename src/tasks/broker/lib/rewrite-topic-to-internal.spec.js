const initRewriteTopicToInternal = require('./rewrite-topic-to-internal');

describe('A rewriteTopicToInternal function', () => {
  describe('with valid configuration', () => {
    let rewriteTopicToInternal;
    beforeEach(() => {
      rewriteTopicToInternal = initRewriteTopicToInternal({
        rmqSysTopic: '$RMQ',
        realmTopic: 'realm',
        userTopic: 'user',
      });
    });

    it('handles plain topics', () => {
      const topic = rewriteTopicToInternal('plain/topic', {realmId: 'r5', userId: 'u23'});
      expect(topic).toBe('realm/r5/plain/topic');
    });
    it('handles rmq sys sync topics', () => {
      const topic = rewriteTopicToInternal('$RMQ/sync/my/entity', {realmId: 'r5', userId: 'u23'});
      expect(topic).toBe('$RMQ/realm/r5/sync/user/u23/entity');
    });
  });
});
