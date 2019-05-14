/**
 * Create lookup query
 * @param {string} scope Scope of authorization the query has to be executed for
 * @param {string} realmId Realm context
 * @param {string} userId Id of user running the query
 * @param {string} [id] Optional id of auth to look up
 * @returns {object} Query
 */
module.exports = ({scope, realmId, userId, id}) => {
  const query = {realmId};
  if (scope !== 'admin') {
    query.userId = userId;
  }

  if (id) {
    query.id = id;
  }

  return query;
};
