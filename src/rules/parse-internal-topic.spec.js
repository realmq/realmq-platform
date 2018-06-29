const parseInternalTopic = require('./parse-internal-topic');

const expectResultToBeValid = ({
  isRmqSysTopic,
  isSync,
  realmId,
  userId,
  topic,
}) => {
  expect(isRmqSysTopic).toBeDefined();
  expect(isSync).toBeDefined();
  expect(realmId).toBeDefined();
  expect(userId).toBeDefined();
  expect(topic).toBeDefined();
};

describe('The parseInternalTopic rule', () => {
  const realmId = 'some-realm-id';
  const userId = 'some-user-id';
  const nonRmqSysTopic = '$sys/some/topic';
  const rmqSysTopic = `$RMQ/realm/${realmId}/some/topic`;
  const rqmSyncTopic = `$RMQ/realm/${realmId}/sync/user/${userId}/subscriptions`;

  describe('when called with a non RMQ sys topic', () => {
    it('should return with null', () => {
      const result = parseInternalTopic(nonRmqSysTopic);
      expect(result).toBeNull();
    });
  });

  describe('when called with an RMQ sys topic', () => {
    it('should tell it\'s an RMQ sys topic', () => {
      const result = parseInternalTopic(rmqSysTopic);

      expectResultToBeValid(result);
      expect(result.isRmqSysTopic).toBe(true);
    });

    it('should extract the realm id', () => {
      const result = parseInternalTopic(rmqSysTopic);

      expectResultToBeValid(result);
      expect(result.realmId).toBe(realmId);
    });
  });

  describe('when called with a sync topic', () => {
    it('should tell it\'s a sync topic', () => {
      const result = parseInternalTopic(rqmSyncTopic);

      expectResultToBeValid(result);
      expect(result.isRmqSysTopic).toBe(true);
      expect(result.isSync).toBe(true);
    });

    it('should extract the realm id', () => {
      const result = parseInternalTopic(rqmSyncTopic);

      expectResultToBeValid(result);
      expect(result.realmId).toBe(realmId);
    });

    it('should extract the user id', () => {
      const result = parseInternalTopic(rqmSyncTopic);

      expectResultToBeValid(result);
      expect(result.userId).toBe(userId);
    });
  });
});
