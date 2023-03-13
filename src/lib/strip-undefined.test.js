const stripUndefined = require('./strip-undefined');

test('undefined values get stripped from object', () => {
  const object = {
    a: 0,
    b: false,
    c: null,
    d: undefined,
  };

  const expectedResult = {
    a: 0,
    b: false,
    c: null,
  };

  const result = stripUndefined(object);

  expect(result).toEqual(object);
  expect(result).toMatchObject(expectedResult);
});
