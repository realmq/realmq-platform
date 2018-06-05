const assertRealmId = require('./assert-realm-id');

module.exports = ({findOneAndDelete}) => async query => {
  assertRealmId(query.realmId);

  return findOneAndDelete(query);
};
