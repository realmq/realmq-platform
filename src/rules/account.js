const {promisify} = require('util');
const {hash: bcryptHash, compare: bcryptCompare} = require('bcryptjs');

/**
 * @function hashPassword
 * @param {string} password Password to hash
 * @param {number} salt Degree of saltines
 * @returns {Promise<string>} Hash
 */
const hashPassword = promisify(bcryptHash);
const comparePasswordToHash = promisify(bcryptCompare);

/**
 * @class AccountRules
 */
module.exports = {
  /**
   * Set password for account
   * @param {AccountModel} account Account
   * @param {string} password Clear text password
   * @returns {Promise<AccountModel>} Modified account
   */
  setPassword: async (account, password) => {
    return {
      ...account,
      passwordHash: await hashPassword(password, 10),
    };
  },
  /**
   * Check if password is valid for account
   * @param {AccountModel} account Account
   * @param {string} password Clear text password
   * @returns {Promise<boolean>} Password matches or not
   */
  checkPassword: async (account, password) => {
    if (!password || !account.passwordHash) {
      return false;
    }

    return comparePasswordToHash(password, account.passwordHash);
  },
};
