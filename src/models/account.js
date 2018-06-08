const stripUndefined = require('../lib/strip-undefined');

/**
 * @class AccountModel
 * @prop {string} id
 * @prop {string} name
 * @prop {string} email
 * @prop {string} passwordHash
 * @prop {Date} [createdAt]
 * @prop {Date} [updatedAt]
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
  updatedAt,
}) => stripUndefined({
  id,
  name,
  email,
  passwordHash,
  createdAt,
  updatedAt,
});
