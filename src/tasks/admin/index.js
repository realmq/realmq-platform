const initCreateRealm = require('./create-realm');
const initCreateRealmToken = require('./create-realm-token');
const initFetchRealm = require('./fetch-realm');
const initListRealms = require('./list-realms');
const initListRealmTokens = require('./list-realm-tokens');

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
    listRealms: initListRealms({realmRepository}),
    listRealmTokens: initListRealmTokens({realmRepository, authRepository}),
  };
};
