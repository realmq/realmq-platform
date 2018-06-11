/**
 * {
  "name": "MongoError",
  "message": "E11000 duplicate key error collection: realmq.accounts index: email dup key: { : \"baranga@posteo.de\" }",
  "driver": true,
  "index": 0,
  "code": 11000,
  "errmsg": "E11000 duplicate key error collection: realmq.accounts index: email dup key: { : \"baranga@posteo.de\" }"
}
 */
const codeMap = new Map([
  [11000, {message: 'Duplicate key error', code: 'duplicate'}],
]);

const error = {
  generic: ({message, code, previous}) => Object.assign(new Error(message), {
    name: 'RepositoryError',
    code,
    previous,
    isRepositoryError: true,
  }),
  duplicate: ({previous}) => error.generic({
    message: 'Duplicate key error',
    code: 'duplicate',
    previous,
    isDuplicateKeyError: true,
  }),
  wrap: op => Promise.resolve(op).catch(err => {
    const {name, code} = err;
    if (name !== 'MongoError') {
      return Promise.reject(err);
    }

    const props = codeMap.has(code) ?
      error.generic(codeMap.get(code)) :
      {message: 'Data store error', code: 'other'};

    return Promise.reject(error.generic({...props, previous: err}));
  }),
};

module.exports = error;
