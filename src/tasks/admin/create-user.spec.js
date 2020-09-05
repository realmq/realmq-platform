const userRepository = require('../../lib/test/mocks/repositories/user');
const realmRepository = require('../../lib/test/mocks/repositories/realm');
const initCreateUser = require('./create-user');

describe('The createUser task', () => {
  let createUser;
  const validCreateUserData = {
    realmId: userRepository.knownRealmId,
    id: userRepository.knownUserId,
    account: {id: realmRepository.knownAccountId},
  };

  beforeEach(() => {
    createUser = initCreateUser({
      realmRepository,
      userRepository,
    });
  });

  describe('when given an invalid realm', () => {
    it('should fail with a task error and correct error code', async () => {
      const {ok, error} = await createUser({
        ...validCreateUserData,
        realmId: realmRepository.unknownRealmId,
      });

      expect(ok).toBe(false);
      expect(error.isTaskError).toBe(true);
      expect(error.code).toBe('UnknownRealm');
    });
  });

  describe('when user already exists', () => {
    it('should fail with a task error and correct error code', async () => {
      const {ok, error} = await createUser({...validCreateUserData, id: userRepository.duplicateUserId});

      expect(ok).toBe(false);
      expect(error.isTaskError).toBe(true);
      expect(error.code).toBe('UserAlreadyExists');
    });
  });

  describe('when configured correctly', () => {
    it('should succeed with a user', async () => {
      const {ok, result, error} = await createUser(validCreateUserData);

      expect(ok).toBe(true);
      expect(error).not.toBeDefined();
      expect(result).toBeDefined();
      expect(result.id).toBe(userRepository.knownUserId);
    });
  });
});
