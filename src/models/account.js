const setPropertyIfDefined = require('./lib/set-property-if-defined');

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
 * @return {AccountModel}
 */
module.exports = ({
  id,
  name,
  email,
  passwordHash,
  createdAt,
  updatedAt,
}) => {
  const account = {};

  setPropertyIfDefined(account, 'id', id);
  setPropertyIfDefined(account, 'name', name);
  setPropertyIfDefined(account, 'email', email);
  setPropertyIfDefined(account, 'passwordHash', passwordHash);
  setPropertyIfDefined(account, 'createdAt', createdAt);
  setPropertyIfDefined(account, 'updatedAt', updatedAt);

  return account;
};
