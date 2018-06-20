const {
  alreadyExists,
  insufficientPrivileges,
  invalidAfterPatch,
  unknown,
} = require('./errors');

describe('The client auth error module', () => {
  const errorCodeToGeneratorMap = {
    AuthTokenAlreadyExists: alreadyExists,
    InsufficientPrivileges: insufficientPrivileges,
    InvalidAuthToken: invalidAfterPatch,
    UnknownAuthToken: unknown,
  };

  it('should create correct errors', () => {
    Object.entries(errorCodeToGeneratorMap).forEach(([errorCode, generator]) => {
      const error = generator();

      expect(error.code).toEqual(errorCode);
    });
  });
});
