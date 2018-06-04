/**
 * Iterate all entries of an object and remove all `undefined`s from it.
 *
 * @param {Object} obj The source object
 * @return {Object} The cleaned source object
 */
module.exports = obj => {
  Object.keys(obj).forEach(
    key => (obj[key] === undefined) && delete obj[key]
  );
  return obj;
};
