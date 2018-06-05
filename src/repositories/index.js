const createAccountRepository = require('./account');
const createAuthRepository = require('./auth');
const createRealmRepository = require('./realm');
const createUserRepository = require('./user');

module.exports = ({accountCollection, authCollection, realmCollection, userCollection}) => ({
  account: createAccountRepository({collection: accountCollection}),
  auth: createAuthRepository({collection: authCollection}),
  realm: createRealmRepository({collection: realmCollection}),
  user: createUserRepository({collection: userCollection})
});
