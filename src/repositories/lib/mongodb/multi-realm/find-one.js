const assertRealmId = require('./assert-realm-id');

module.exports = ({findOne}) => async data => {
  assertRealmId(data.realmId);

  return findOne(data);
};
