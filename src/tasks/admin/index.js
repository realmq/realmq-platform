const initAuthenticateAccount = require('./authenticate-account');
const initCreateAccount = require('./create-account');
const initCreateRealm = require('./create-realm');
const initCreateRealmToken = require('./create-realm-token');
const initFetchRealm = require('./fetch-realm');
const initListRealms = require('./list-realms');
const initListRealmTokens = require('./list-realm-tokens');

/** @typedef {object} AdminTasks */
/**
 * @param {AccountRules} accountRules The account rules
 * @param {RealmRepository} realmRepository The realm repository
 * @param {AuthRepository} authRepository The auth repository
 * @param {AccountRepository} accountRepository The account repository
 * @param {UserRepository} userRepository The user repository
 * @returns {AdminTasks} Initialized admin tasks
 */
module.exports = ({accountRules, accountRepository, authRepository, realmRepository, userRepository}) => {
  const fetchRealm = initFetchRealm({realmRepository});

  return {
    fetchRealm,
    authenticateAccount: initAuthenticateAccount({accountRules, accountRepository}),
    createAccount: initCreateAccount({accountRules, accountRepository}),
    createRealm: initCreateRealm({realmRepository}),
    createRealmToken: initCreateRealmToken({fetchRealm, userRepository, authRepository}),
    listRealms: initListRealms({realmRepository}),
    listRealmTokens: initListRealmTokens({fetchRealm, authRepository}),
  };
};
