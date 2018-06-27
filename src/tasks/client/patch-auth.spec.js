const authRepository = require('../../lib/test/mocks/repositories/auth');
const initPathAuth = require('./patch-auth');

describe('The client pathAuth task', () => {
  const authToken = {
    scope: 'admin',
    realmId: authRepository.knownRealmId,
    userId: authRepository.knownUserId,
  };
  let patchAuth;

  beforeEach(() => {
    patchAuth = initPathAuth({authRepository});
  });

  describe('when called with non-admin scope', () => {
    it('should fail with InsufficientPrivileges error', async () => {
      const {ok, error} = await patchAuth({
        authToken: {authToken, scope: 'user'},
        id: authRepository.knownAuthId,
        patch: [],
      });

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.code).toBe('InsufficientPrivileges');
    });
  });

  describe('when called with invalid patch', () => {
    it('should fail with InvalidPatch error', async () => {
      const {ok, error} = await patchAuth({
        authToken,
        id: authRepository.knownAuthId,
        patch: {},
      });

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.code).toBe('InvalidPatch');
    });
  });

  describe('when called with an unknown auth id', () => {
    it('should fail with UnknownAuthToken error', async () => {
      const {ok, error} = await patchAuth({
        authToken,
        id: authRepository.unknownAuthId,
        patch: [],
      });

      expect(ok).toBe(false);
      expect(error).toBeDefined();
      expect(error.code).toBe('UnknownAuthToken');
    });
  });

  describe('when called with valid patch', () => {
    describe('requesting an allowed patch', () => {
      it('should execute the patch for an allowed property', async () => {
        const patchValue = 'patched value';
        const {ok, result} = await patchAuth({
          authToken,
          id: authRepository.knownAuthId,
          patch: [
            {op: 'replace', path: '/description', value: patchValue},
          ],
        });

        expect(ok).toBe(true);
        expect(result.description).toBe(patchValue);
      });
    });

    describe('requesting an invalid patch', () => {
      it('should fail with InvalidAuthToken error', async () => {
        const {ok, error} = await patchAuth({
          authToken,
          id: authRepository.knownAuthId,
          patch: [
            {op: 'add', path: '/foo', value: 'bar'},
          ],
        });

        expect(ok).toBe(false);
        expect(error).toBeDefined();
        expect(error.code).toBe('InvalidAuthToken');
      });
    });
  });
});
