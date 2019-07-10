const {success, failure} = require('../../lib/result');
const createTaskError = require('../../lib/error/task');

/**
 * @param {RealmRepository} realmRepository The realm repository
 * @param {UserRepository} userRepository The user repository
 * @return {AdminTasks#createUser} Task
 */
module.exports = ({realmRepository, userRepository}) =>
  /**
   * @function AdminTasks#createUser
   * @param {{id: string}} account
   * @param {string} realmId
   * @param {string} [id]
   * @param {object} [properties]
   * @return {Promise<Result<UserModel>>} User
   */
  async ({account, realmId, id, properties}) => {
    const realm = await realmRepository.findOne({ownerAccountId: account.id, id: realmId});
    if (!realm) {
      return failure(createTaskError({
        code: 'UnknownRealm',
        message: 'Cannot lookup the given realm.',
      }));
    }

    try {
      const user = await userRepository.create({realmId, id, properties});
      return success(user);
    } catch (error) {
      if (error.isDuplicateKeyError) {
        return failure(
          createTaskError({
            code: 'UserAlreadyExists',
            message: 'A user with the same id already exists.',
          }),
          error
        );
      }

      return Promise.reject(error);
    }
  };
