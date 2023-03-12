const {success} = require('../../lib/result');
const createLookupQuery = require('./auth/create-lookup-query');

/**
 * Init list auths task
 * @param {AuthRepository} authRepository Auth repository
 * @returns {ClientTasks#listAuths} List auths task
 */
module.exports = ({authRepository}) =>
  /**
   * @function ClientTasks#listAuths
   * @param {AuthModel} authToken Authentication
   * @param {number} offset Offset
   * @param {number} limit Limit
   * @returns {Result<PaginatedList<AuthModel>>} Auth list
   */
  async ({authToken, offset, limit}) => {
    const {scope, realmId, userId} = authToken;

    const query = createLookupQuery({scope, realmId, userId});
    const list = await authRepository.find({...query}, {offset, limit});
    return success(list);
  };
