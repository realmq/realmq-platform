const {success, failure} = require('../../lib/result');
const error = require('../../lib/error/task');

/**
 *
 * @param {AccountRepository} accountRepository Account Repository
 * @returns {Function} Task
 */
module.exports = ({accountRepository}) =>
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
      const account = await accountRepository.create(data);
      return success(account);
    } catch (err) {
      if (err.name === 'RepositoryError' && err.reason === 'duplicate') {
        return failure([
          error(
            'EmailAlreadyTaken',
            'Account could not be created, since an account with the same email already exists.'
          ),
          err
        ]);
      }
      return Promise.reject(err);
    }
  };
