const {success} = require('../../lib/result');

/**
 * Initialize user upsert task.
 *
 * @param {UserRepository} userRepository User repository
 * @return {CommonTasks#upsertUser} Task
 */
module.exports = ({userRepository}) =>
  /**
   * @typedef {Function} CommonTasks#upsertUser
   * @param {string} realmId
   * @param {string} [id]
   * @return {Promise<Result<UserModel>>}
   */
  async ({realmId, id}) => {
    let user;

    if (id) {
      user = await userRepository.findOne({id, realmId});
    }

    if (!user) {
      user = await userRepository.create({id, realmId});
    }

    return success(user);
  };
