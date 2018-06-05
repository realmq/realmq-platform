const stripUndefined = require('../lib/strip-undefined');

/**
 * @typedef {Object} AccountModel
 * @param {string} id
 * @param {string} name
 * @param {string} email
 * @param {string} passwordHash
 * @param {Date} [createdAt]
 * @param {Date} [updatedAt]
 */

/**
 * @return {AccountModel} The generalized account model
 */
module.exports = ({
  id,
  name,
  email,
  passwordHash,
  createdAt,
  updatedAt
}) => stripUndefined({
  id,
  name,
  email,
  passwordHash,
  createdAt,
  updatedAt
});
