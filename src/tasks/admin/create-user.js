const {success, failure} = require('../../lib/result');
const createTaskError = require('../../lib/error/task');

/**
 * @param {UserRepository} userRepository The user repository
 * @param {RealmRepository} realmRepository The realm repository
 * @returns {AdminTasks#createRealm} Task
 */
module.exports = ({userRepository, realmRepository}) =>
  /**
   * @typedef {Function} AdminTasks#createUser
   * @param {object} args
   * @param {string} args.realmId The realm of the user
   * @param {string} [args.id] The custom id of the user
   * @param {object} [args.properties] An optional hash map of additional properties.
   * @return {Promise<Result<?UserModel>>} user
   */
  async ({realmId, id, properties = {}}) => {
    const realm = await realmRepository.findOne({id: realmId});

    if (!realm) {
      return failure(createTaskError({
        code: 'UnknownRealm',
        message: 'Cannot lookup the given realm.',
      }));
    }

    try {
      return success(await userRepository.create({realmId, id, properties}));
    } catch (error) {
      if (error.isDuplicateKeyError) {
        return failure(
          createTaskError({
            code: 'UserAlreadyExists',
            message: 'User could not be created, since a user with the same id already exists.',
          }),
          error,
        );
      }

      throw error;
    }
  };
