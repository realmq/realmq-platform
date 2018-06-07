/**
 * @typedef {object} AdminTasks~authenticateAccountResult
 * @prop {boolean} authenticated
 * @prop {AccountModel} [account]
 */
/**
 * Authenticate account by email and password
 * @param {AccountRules} accountRules Account rules
 * @param {AccountRepository} accountRepository Account repository
 * @returns {Function} Task
 */
module.exports = ({accountRules, accountRepository}) =>
  /**
   * @function ApiTasks#authenticateAccount
   * @param {string} email
   * @param {string} password
   * @returns {Promise<AdminTasks~authenticateAccountResult>}
   */
  async (email, password) => {
    const account = await accountRepository.findOneByEmail(email);
    if (!account) {
      return {authenticated: false};
    }

    const match = await accountRules.checkPassword(account, password);
    if (!match) {
      return {authenticated: false};
    }

    return {
      authenticated: true,
      account
    };
  };
