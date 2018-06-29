const {unknown: unknownError} = require('./errors');

describe('The client channel task errors', () => {
  it('should create an unkown channel error', () => {
    const error = unknownError();
    expect(error.code).toBe('UnknownChannel');
  });
});
