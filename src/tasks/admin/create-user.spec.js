const realmRepository = require('../../lib/test/mocks/repositories/realm');
const userRepository = require('../../lib/test/mocks/repositories/user');
const initCreateUser = require('./create-user');

describe('A createUser admin task', () => {
  describe('with proper configuration', () => {
    let createUser;

    beforeEach(() => {
      createUser = initCreateUser({userRepository, realmRepository});
    });

    describe('when given an invalid realm', () => {
      it('should fail with a task error and correct error code', async () => {
        const {ok, error} = await createUser({
          realmId: realmRepository.unknownRealmId,
        });

        expect(ok).toBe(false);
        expect(error).toBeDefined();
        expect(error.isTaskError).toBe(true);
        expect(error.code).toBe('UnknownRealm');
      });
    });

    describe('when given an existent user id', () => {
      it('should fail with a task error and correct error code', async () => {
        const {ok, error} = await createUser({
          realmId: realmRepository.knownRealmId,
          id: userRepository.duplicateUserId
        });

        expect(ok).toBe(false);
        expect(error).toBeDefined();
        expect(error.isTaskError).toBe(true);
        expect(error.code).toBe('UserAlreadyExists');
      });
    });

    describe('when configured correctly', () => {
      it('should succeed with a created user', async () => {
        const {ok, result, error} = await createUser({
          realmId: realmRepository.knownRealmId,
          id: userRepository.unknownUserId
        });

        expect(ok).toBe(true);
        expect(error).not.toBeDefined();
        expect(result).toMatchObject({
          realmId: realmRepository.knownRealmId,
          id: userRepository.unknownUserId,
          properties: {},
        });
      });
    });
  });
});
