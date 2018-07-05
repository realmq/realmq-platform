const subscriptionRepository = require('../../lib/test/mocks/repositories/subscription');
const initPatchSubscription = require('./patch-subscription');

describe('The client patchSubscription task', () => {
  const authToken = {
    scope: 'admin',
    realmId: subscriptionRepository.knownRealmId,
  };
  const sendSubscriptionSync = jest.fn();
  let patchSubscription;

  beforeEach(() => {
    patchSubscription = initPatchSubscription({
      subscriptionRepository,
      sendSubscriptionSync,
    });
  });

  describe('when called with non-admin scope', () => {
    it('should fail with InsufficientPrivileges error', async () => {
      const {ok, error} = await patchSubscription({
        authToken: {authToken, scope: 'user'},
        id: subscriptionRepository.knownSubscriptionId,
        patch: [],
      });

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.code).toBe('InsufficientPrivileges');
    });
  });

  describe('when called with invalid patch', () => {
    it('should fail with InvalidPatch error', async () => {
      const {ok, error} = await patchSubscription({
        authToken,
        id: subscriptionRepository.knownSubscriptionId,
        patch: {},
      });

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.code).toBe('InvalidPatch');
    });
  });

  describe('when called with an unknown subscription id', () => {
    it('should fail with UnknownChannel error', async () => {
      const {ok, error} = await patchSubscription({
        authToken,
        id: subscriptionRepository.unknownSubscriptionId,
        patch: [],
      });

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.code).toBe('UnknownSubscription');
    });
  });

  describe('when called with valid patch', () => {
    describe('requesting an allowed patch', () => {
      it('should execute the patch for an allowed property', async () => {
        const {ok: okFirstPatch, result: resultFirstPatch} = await patchSubscription({
          authToken,
          id: subscriptionRepository.knownSubscriptionId,
          patch: [
            {op: 'replace', path: '/allowRead', value: true},
            {op: 'replace', path: '/allowWrite', value: true},
          ],
        });

        expect(okFirstPatch).toBe(true);
        expect(resultFirstPatch.allowRead).toBe(true);

        const {ok: okSecondPatch, result: resultSecondPatch} = await patchSubscription({
          authToken,
          id: subscriptionRepository.knownSubscriptionId,
          patch: [
            {op: 'replace', path: '/allowRead', value: false},
            {op: 'replace', path: '/allowWrite', value: false},
          ],
        });

        expect(okSecondPatch).toBe(true);
        expect(resultSecondPatch.allowRead).toBe(false);
      });

      it('should send a subscription updated sync message', async () => {
        await patchSubscription({
          authToken,
          id: subscriptionRepository.knownSubscriptionId,
          patch: [{op: 'replace', path: '/allowRead', value: true}],
        });

        expect(sendSubscriptionSync).toHaveBeenCalled();

        const {action} = sendSubscriptionSync.mock.calls[0][0] || {};
        expect(action).toBe('updated');
      });
    });

    describe('requesting an invalid patch', () => {
      it('should fail with InvalidAuthToken error', async () => {
        const {ok, error} = await patchSubscription({
          authToken,
          id: subscriptionRepository.knownSubscriptionId,
          patch: [
            {op: 'add', path: '/userId', value: 'something'},
          ],
        });

        expect(ok).toBe(false);
        expect(error).toBeDefined();
        expect(error.code).toBe('InvalidSubscription');
      });
    });
  });
});
