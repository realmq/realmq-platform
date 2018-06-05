const assertRealmId = require('./assert-realm-id');

module.exports = ({create}) => async data => {
  assertRealmId(data.realmId);

  return create(data);
};
