const assertRealmId = require('./assert-realm-id');

module.exports = ({deleteMany}) => async query => {
  assertRealmId(query.realmId);

  return deleteMany(query);
};
