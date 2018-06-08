const initAuthenticateAccount = require('./authenticate-account');
const initCreateAccount = require('./create-account');
const initFetchRealm = require('./fetch-realm');
const initListRealms = require('./list-realms');

/** @typedef {object} AdminTasks */
/**
 * @param {AccountRules} accountRules The account rules
 * @param {AccountRepository} accountRepository The account repository
 * @param {RealmRepository} realmRepository The real repository
 * @returns {AdminTasks} Initialized admin tasks
 */
module.exports = ({accountRules, accountRepository, realmRepository}) => ({
  authenticateAccount: initAuthenticateAccount({accountRules, accountRepository}),
  createAccount: initCreateAccount({accountRules, accountRepository}),
  fetchRealm: initFetchRealm({realmRepository}),
  listRealms: initListRealms({realmRepository}),
});
