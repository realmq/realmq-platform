const jsonPatch = require('fast-json-patch');
const schemaValidator = require('../../lib/schema-validator');
const {success, failure} = require('../../lib/result');
const error = require('../../lib/error/task');

/**
 * JSON Schema describing the set of changeable properties
 */
const changeablePropertiesSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    properties: {
      type: 'object',
    },
  },
  required: ['properties'],
};

const validateChangeableProperties = schemaValidator(changeablePropertiesSchema);

/**
 * Init patch user task
 * @param {UserRepository} userRepository User repository
 * @returns {ClientTasks#patchUser} Task
 */
module.exports = ({userRepository}) =>
  /**
   * @function ClientTasks#patchUser
   * @param {AuthModel} authToken Authentication
   * @param {string} id The user id
   * @param {object[]} patch Patch to apply
   * @returns {Result<UserModel>}
   */
  async ({authToken, id, patch}) => {
    const {scope, realmId} = authToken;

    if (scope !== 'admin') {
      return failure(error({
        code: 'InsufficientPrivileges',
        message: 'Insufficient privileges to patch users.',
      }));
    }

    const user = await userRepository.findOne({realmId, id});
    if (!user) {
      return failure(error({
        code: 'UnknownUser',
        message: 'User does not exists.',
      }));
    }

    const changeableProperties = {
      properties: user.properties || {},
    };

    const patchValidationError = jsonPatch.validate(patch, changeableProperties);
    if (patchValidationError) {
      return failure(
        error({
          code: 'InvalidPatch',
          message: 'Provided patch is invalid.',
        }),
        patchValidationError
      );
    }

    const {newDocument: patchedChangeableProperties} = jsonPatch.applyPatch(changeableProperties, patch);

    const {valid, errors: validationErrors} = validateChangeableProperties(patchedChangeableProperties);
    if (!valid) {
      return failure(
        error({
          code: 'InvalidUser',
          message: 'Invalid user after applying patch.',
        }),
        validationErrors
      );
    }

    const patchedUser = {
      ...user,
      ...patchedChangeableProperties,
    };
    return success(await userRepository.update(patchedUser));
  };
