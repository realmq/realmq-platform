const Ajv = require('ajv');
const jsonPatch = require('fast-json-patch');
const {success, failure} = require('../../lib/result');
const error = require('../../lib/error/task');
const {
  invalidAfterPatch: errorInvalidAfterPatch,
  insufficientPrivileges: errorInsufficientPrivileges,
  unknown: unknownAuthError,
} = require('./auth/errors');
const createLookupQuery = require('./auth/create-lookup-query');

const changeablePropertiesValidator = (new Ajv()).compile({
  type: 'object',
  additionalProperties: false,
  properties: {
    description: {
      type: 'string',
    },
  },
});

/**
 * Init patch auth task
 * @param {AuthRepository} authRepository Auth repository
 * @returns {ClientTasks#patchAuth} Patch auth task
 */
module.exports = ({authRepository}) =>
  /**
   * @function ClientTasks#patchAuth
   * @param {AuthModel} authToken Authentication
   * @param {string} id Id of auth to patch
   * @param {object[]} patch Patch to apply
   * @returns {Result<AuthModel>} Patched auth
   */
  async ({authToken, id, patch}) => {
    const {scope, realmId, userId} = authToken;

    if (scope !== 'admin') {
      return failure(errorInsufficientPrivileges({
        action: 'patch an auth token',
      }));
    }

    const query = createLookupQuery({scope, realmId, userId, id});
    const authToPatch = await authRepository.findOne(query);
    if (!authToPatch) {
      return failure(unknownAuthError());
    }

    const changeableProperties = {
      description: authToPatch.description || '',
    };

    const patchValidationError = jsonPatch.validate(patch, changeableProperties);
    if (patchValidationError) {
      return failure(
        error({
          code: 'InvalidPatch',
          message: 'Provided patch is invalid.',
        }),
        patchValidationError,
      );
    }

    const patchedProperties = jsonPatch.applyPatch(changeableProperties, patch).newDocument;
    const valid = changeablePropertiesValidator(patchedProperties);
    if (!valid) {
      return failure(
        errorInvalidAfterPatch(),
        changeablePropertiesValidator.errors,
      );
    }

    const updatedAuth = await authRepository.update({
      ...authToPatch,
      ...patchedProperties,
    });
    return success(updatedAuth);
  };
