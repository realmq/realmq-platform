const initLookupStaticTopicPermission = require('./lookup-static-topic-permission');

describe('The lookupStaticTopicPermission module', () => {
  let lookupStaticTopicPermission;
  const sysTopic = '$TEST$';

  beforeEach(() => {
    lookupStaticTopicPermission = initLookupStaticTopicPermission({rmqSysTopic: sysTopic});
  });

  it('should find the /sync/my/subscriptions topic permissions', () => {
    const permission = lookupStaticTopicPermission({topic: `${sysTopic}/sync/my/subscriptions`});

    expect(permission).toBeDefined();
  });
});
