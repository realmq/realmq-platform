/**
 * Iterate all entries of an object and remove all `undefined`s from it.
 *
 * @param {Object} obj The source object
 * @return {Object} The cleaned source object
 */
module.exports = object => {
  for (const key of Object.keys(object)) {
    if (object[key] === undefined) {
      delete object[key];
    }
  }

  return object;
};
