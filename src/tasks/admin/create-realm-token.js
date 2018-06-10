const {success, failure} = require('../../lib/result');
const createTaskError = require('../../lib/error/task');

/**
 * @param {RealmRepository} realmRepository The realm repository
 * @param {UserRepository} userRepository The user repository
 * @param {AuthRepository} authRepository Auth repository
 * @return {AdminTasks#createRealmToken} Task
 */
module.exports = ({realmRepository, userRepository, authRepository}) =>
  /**
   * @function AdminTasks#createRealmToken
   * @param {{id: string}} account
   * @param {string} realmId
   * @param {string} [id]
   * @param {string} [userId]
   * @param {string} [scope]
   * @param {string} [description]
   * @return {Promise<Result<AuthModel>>} Auth Token
   */
  async ({account, realmId, id, userId, scope, description}) => {
    const realm = await realmRepository.findOne({ownerAccountId: account.id, id: realmId});
    if (!realm) {
      return failure(createTaskError(
        'UnknownEntity',
        'Cannot lookup the given realm.'
      ));
    }

    const user = await userRepository.findOrCreate({realmId, id: userId});

    if (!user) {
      return failure(createTaskError(
        'UserAutoCreationFailed',
        'Could not fetch or create user on the fly.'
      ));
    }

    try {
      return success(await authRepository.create({realmId, id, userId: user.id, scope, description}));
    } catch (tokenCreationErr) {
      if (tokenCreationErr.isDuplicateKeyError) {
        return failure(
          createTaskError(
            'AuthTokenAlreadyExists',
            'Auth token could not be created, since an auth token with the same id already exists.',
          ),
          tokenCreationErr
        );
      }
      return Promise.reject(tokenCreationErr);
    }
  };
