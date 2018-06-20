const subscriptionRepository = require('../../lib/test/mocks/repositories/subscription');
const isPaginatedList = require('../../lib/test/models/is-paginated-list');
const initListSubscriptions = require('./list-subscriptions');

describe('The client listSubscriptions task', () => {
  const offset = 20;
  const limit = 10;
  const authToken = {
    scope: 'admin',
    realmId: subscriptionRepository.knownRealmId,
    userId: subscriptionRepository.knownUserId,
  };
  let listSubscriptions;

  beforeEach(() => {
    listSubscriptions = initListSubscriptions({subscriptionRepository});
  });

  it('should come back with a paginated list of subscriptions', async () => {
    const {ok, result} = await listSubscriptions({authToken, offset, limit});

    expect(ok).toBe(true);
    expect(isPaginatedList(result)).toBe(true);
    expect(result.offset).toBe(offset);
    expect(result.limit).toBe(limit);
    expect(result.items[0].id).toBe(subscriptionRepository.knownSubscriptionId);
  });
});
