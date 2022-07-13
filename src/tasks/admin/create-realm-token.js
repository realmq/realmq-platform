const {success, failure} = require('../../lib/result');
const createTaskError = require('../../lib/error/task');

/**
 * @param {AuthTokenRules} authTokenRules The auth token rules
 * @param {RealmRepository} realmRepository The realm repository
 * @param {UserRepository} userRepository The user repository
 * @param {AuthRepository} authRepository Auth repository
 * @return {AdminTasks#createRealmToken} Task
 */
module.exports = ({authTokenRules, realmRepository, userRepository, authRepository}) =>
  /**
   * @function AdminTasks#createRealmToken
   * @param {object} args
   * @param {string} args.realmId
   * @param {string} [args.id]
   * @param {string} [args.userId]
   * @param {string} [args.scope]
   * @param {string} [args.description]
   * @return {Promise<Result<AuthModel>>} Auth Token
   */
  async ({realmId, id, userId, scope, description}) => {
    const realm = await realmRepository.findOne({id: realmId});
    if (!realm) {
      return failure(createTaskError({
        code: 'UnknownRealm',
        message: 'Cannot lookup the given realm.',
      }));
    }

    const user = await userRepository.findOrCreate({realmId, id: userId});

    if (!user) {
      return failure(createTaskError({
        code: 'UserAutoCreationFailed',
        message: 'Could not fetch or create user on the fly.',
      }));
    }

    try {
      const entity = await authTokenRules.buildEntity({
        realmId,
        id,
        userId: user.id,
        scope,
        description,
      });
      return success(await authRepository.create(entity));
    } catch (error) {
      if (error.isDuplicateKeyError) {
        return failure(
          createTaskError({
            code: 'AuthTokenAlreadyExists',
            message: 'Auth token could not be created, since an auth token with the same id already exists.',
          }),
          error
        );
      }

      return Promise.reject(error);
    }
  };
