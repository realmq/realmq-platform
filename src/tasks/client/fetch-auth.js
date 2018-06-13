const {success} = require('../../lib/result');
const createLookupQuery = require('./auth/create-lookup-query');

/**
 * Init fetch auth task
 * @param {AuthRepository} authRepository Auth repository
 * @returns {ClientTasks#fetchAuth} Fetch auth task
 */
module.exports = ({authRepository}) =>
  /**
   * @function ClientTasks#fetchAuth
   * @param {AuthModel} authToken Authentication
   * @param {string} id Id of auth token to fetch
   * @returns {Result<?AuthModel>}
   */
  async ({authToken, id}) => {
    const {scope, realmId, userId} = authToken;

    const query = createLookupQuery({scope, realmId, id, userId});
    const fetchedAuth = await authRepository.findOne(query);
    return success(fetchedAuth ? fetchedAuth : null);
  };
