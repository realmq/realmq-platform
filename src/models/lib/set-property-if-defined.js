/**
 * If value is defined it will be set with the given name on the given object
 *
 * @param {Object} object
 * @param {string} name
 * @param {*} value
 */
module.exports = (object, name, value) => {
  if (typeof value !== 'undefined') {
    object[name] = value;
  }
};
