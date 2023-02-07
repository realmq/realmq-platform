const initCreateRealm = require('./create-realm');
const initCreateRealmToken = require('./create-realm-token');
const initCreateUser = require('./create-user');
const initFetchRealm = require('./fetch-realm');
const initListRealms = require('./list-realms');
const initListRealmTokens = require('./list-realm-tokens');
const initListUsers = require('./list-users');

/** @typedef {object} AdminTasks */
/**
 * @param {AuthTokenRules} authTokenRules The auth token rules
 * @param {RealmRepository} realmRepository The realm repository
 * @param {AuthRepository} authRepository The auth repository
 * @param {UserRepository} userRepository The user repository
 * @returns {AdminTasks} Initialized admin tasks
 */
module.exports = ({authTokenRules, authRepository, realmRepository, userRepository}) => {
  return {
    fetchRealm: initFetchRealm({realmRepository}),
    createRealm: initCreateRealm({realmRepository}),
    createRealmToken: initCreateRealmToken({authTokenRules, realmRepository, userRepository, authRepository}),
    createUser: initCreateUser({userRepository, realmRepository}),
    listRealms: initListRealms({realmRepository}),
    listRealmTokens: initListRealmTokens({realmRepository, authRepository}),
    listUsers: initListUsers({realmRepository, userRepository})
  };
};
