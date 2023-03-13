const codeMap = new Map([
  [11_000, duplicate],
]);

/**
 * @class RepositoryError
 * @extends Error
 * @property {string} name
 * @property {string} code
 * @property {Error|void} previous
 * @property {boolean} isRepositoryError
 */
/**
 * Create a generic repository error.
 *
 * @param {string} message The error message
 * @param {string} code The error code
 * @param {Error} [previous] The root error
 * @param {object} additionalProperties Additional properties
 * @return {RepositoryError} The repository error
 */
function generic({
  message = 'Data store error',
  code = 'UnknownRepositoryError',
  previous,
  ...additionalProperties
}) {
  return Object.assign(new Error(message), {
    ...additionalProperties,
    name: 'RepositoryError',
    code,
    previous,
    isRepositoryError: true,
  });
}

/**
 * @class DuplicateKeyError
 * @extends RepositoryError
 * @property {boolean} isDuplicateKeyError
 * @return {DuplicateKeyError}
 */
/**
 * Create a duplicate key error object.
 *
 * @param {Error} [previous] The root error
 * @return {DuplicateKeyError} The duplicate key error
 */
function duplicate({previous} = {}) {
  return generic({
    message: 'Duplicate key error',
    code: 'DuplicateKeyError',
    previous,
    isDuplicateKeyError: true,
  });
}

/**
 * @param {*} op Io operation
 * @return {Promise<*>} Result
 */
function wrap(op) {
  return Promise.resolve(op).catch(error => {
    const {name, code} = error;
    if (name !== 'MongoError') {
      throw error;
    }

    const wrappedError = (codeMap.get(code) || generic)({previous: error});
    throw wrappedError;
  });
}

module.exports = {
  generic,
  duplicate,
  wrap,
};
