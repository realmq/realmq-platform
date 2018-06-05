const assertRealmId = require('./assert-realm-id');

module.exports = ({findOneAndUpdate}) => async (query, data) => {
  assertRealmId(query.realmId);

  // Strip off realmId
  const {realmId, ...updateData} = data;

  return findOneAndUpdate(query, updateData);
};
