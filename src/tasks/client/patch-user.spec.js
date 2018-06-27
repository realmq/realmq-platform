const userRepository = require('../../lib/test/mocks/repositories/user');
const initPatchUser = require('./patch-user');

describe('The client patchSubscription task', () => {
  const authToken = {
    scope: 'admin',
    realmId: userRepository.knownRealmId,
  };
  let patchUser;

  beforeEach(() => {
    patchUser = initPatchUser({userRepository});
  });

  describe('when called with non-admin scope', () => {
    it('should fail with InsufficientPrivileges error', async () => {
      const {ok, error} = await patchUser({
        authToken: {authToken, scope: 'user'},
        id: userRepository.knownUserId,
        patch: [],
      });

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.code).toBe('InsufficientPrivileges');
    });
  });

  describe('when called with invalid patch', () => {
    it('should fail with InvalidPatch error', async () => {
      const {ok, error} = await patchUser({
        authToken,
        id: userRepository.knownUserId,
        patch: {},
      });

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.code).toBe('InvalidPatch');
    });
  });

  describe('when called with an unknown subscription id', () => {
    it('should fail with UnknownUser error', async () => {
      const {ok, error} = await patchUser({
        authToken,
        id: userRepository.unknownUserId,
        patch: [],
      });

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.code).toBe('UnknownUser');
    });
  });

  describe('when called with valid patch', () => {
    describe('requesting an allowed patch', () => {
      it('should execute the patch for an allowed property', async () => {
        const patchValue = {foo: 'bar'};
        const {ok, result} = await patchUser({
          authToken,
          id: userRepository.knownUserId,
          patch: [
            {op: 'replace', path: '/properties', value: patchValue},
          ],
        });

        expect(ok).toBe(true);
        expect(result.properties).toEqual(patchValue);
      });
    });

    describe('requesting an invalid patch', () => {
      it('should fail with InvalidUser error', async () => {
        const {ok, error} = await patchUser({
          authToken,
          id: userRepository.knownUserId,
          patch: [
            {op: 'add', path: '/foo', value: 'bar'},
          ],
        });

        expect(ok).toBe(false);
        expect(error).toBeDefined();
        expect(error.code).toBe('InvalidUser');
      });
    });
  });
});
