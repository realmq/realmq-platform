const initAuthenticateAccount = require('./authenticate-account');
const initCreateAccount = require('./create-account');
const initListRealms = require('./list-realms');

/** @typedef {object} AdminTasks */
/**
 * @param realmRepository
 * @returns {AdminTasks} Initialized admin tasks
 */
module.exports = ({accountRules, accountRepository, realmRepository}) => ({
  authenticateAccount: initAuthenticateAccount({accountRules, accountRepository}),
  createAccount: initCreateAccount({accountRepository}),
  listRealms: initListRealms({realmRepository})
});
