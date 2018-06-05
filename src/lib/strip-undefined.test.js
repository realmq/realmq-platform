const stripUndefined = require('./strip-undefined');

test('undefined values get stripped from object', () => {
  const obj = {
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

  const result = stripUndefined(obj);

  expect(result).toEqual(obj);
  expect(result).toMatchObject(expectedResult);
});
