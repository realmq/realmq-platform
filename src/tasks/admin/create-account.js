const {success, failure} = require('../../lib/result');
const error = require('../../lib/error/task');

/**
 * @param {AccountRules} accountRules Account rules
 * @param {AccountRepository} accountRepository Account repository
 * @returns {Function} Task
 */
module.exports = ({accountRules, accountRepository}) =>
  /**
   * @function AdminTasks#createAccount
   * @param {object} data Data
   * @returns {Promise<AccountModel>} Account
   */
  async data => {
    // We don't check if the email address is already in use by purpose. This
    // way we are either the first one to create a account with that email or
    // we fail with a duplication error. Even if we would check before we could
    // get a duplication error so we have to handle it anyway. We just skip the
    // inaccurate check.
    try {
      const dataWithPasswordHash = await accountRules.setPassword(data, data.password);
      const account = await accountRepository.create(dataWithPasswordHash);
      return success(account);
    } catch (err) {
      if (err.isDuplicateKeyError) {
        return failure(
          error({
            code: 'EmailAlreadyTaken',
            message: 'Account could not be created, since an account with the same email already exists.',
          }),
          err
        );
      }
      return Promise.reject(err);
    }
  };
