const ajv = require('ajv');
const jsonPatch = require('fast-json-patch');
const {success, failure} = require('../../lib/result');
const error = require('../../lib/error/task');

/**
 * JSON Schema describing the set of changeable properties
 */
const changeablePropertiesSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    allowRead: {
      type: 'boolean',
    },
    allowWrite: {
      type: 'boolean',
    },
  },
  required: ['allowRead', 'allowWrite'],
};

/**
 * Validate changeable properties
 * @param {object} properties Properties to validate
 * @returns {{valid: boolean, errors: object[]}} Result
 */
const validateChangeableProperties = properties => {
  const valid = ajv.validate(changeablePropertiesSchema, properties);
  return {valid, errors: valid ? [] : ajv.errors};
};

/**
 * Init patch subscription task
 * @param {SubscriptionRepository} subscriptionRepository Subscription repository
 * @returns {ClientTasks#patchSubscription} Task
 */
module.exports = ({subscriptionRepository}) =>
  /**
   * @function ClientTasks#patchSubscription
   * @param {AuthModel} authToken Authentication
   * @param {string} id Subscription id
   * @param {object[]} patch Patch to apply
   * @returns {Result<ChannelModel>}
   */
  async ({authToken, id, patch}) => {
    const {scope, realmId} = authToken;

    if (scope !== 'admin') {
      return failure(error({
        code: 'InsufficientPrivileges',
        message: 'Insufficient privileges to patch a channel.',
      }));
    }

    const subscription = await subscriptionRepository.findOne({realmId, id});
    if (!subscription) {
      return failure(error({
        code: 'UnknownSubscription',
        message: 'Subscription does not exists.',
      }));
    }

    const changeableProperties = {
      allowRead: subscription.allowRead,
      allowWrite: subscription.allowWrite,
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

    const patchedChangeableProperties =
      jsonPatch.applyPatch(changeableProperties, patch);
    const {valid, errors: validationErrors} = validateChangeableProperties(patchedChangeableProperties);
    if (!valid) {
      return failure(
        error({
          code: 'InvalidSubscription',
          message: 'Invalid subscription after applying patch.',
        }),
        validationErrors
      );
    }

    const patchedSubscription = {
      ...subscription,
      ...patchedChangeableProperties,
    };
    const updatedChannel = await subscriptionRepository.update(patchedSubscription);
    return success(updatedChannel);
  };
