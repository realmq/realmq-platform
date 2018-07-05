const Ajv = require('ajv');
const {success, failure} = require('../../lib/result');
const error = require('../../lib/error/task');
const {apply: patchDocument, validate: validatePatch} = require('../../lib/json-patch');

/**
 * JSON Schema describing the set of changeable properties
 */
const changeablePropertiesSchemaValidator = (new Ajv()).compile({
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
});

/**
 * Validate changeable properties
 * @param {object} properties Properties to validate
 * @returns {{valid: boolean, errors: object[]}} Result
 */
const validateChangeableProperties = properties => {
  const valid = changeablePropertiesSchemaValidator(properties);
  return {valid, errors: (changeablePropertiesSchemaValidator.errors || [])};
};

/**
 * Init patch subscription task
 * @param {SubscriptionRepository} subscriptionRepository Subscription repository
 * @param {CommonTasks#sendSubscriptionSyncMessage} sendSubscriptionSyncMessage Task for sending subscription sync
 * @returns {ClientTasks#patchSubscription} Task
 */
module.exports = ({
  subscriptionRepository,
  sendSubscriptionSyncMessage,
}) =>
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
        message: 'Insufficient privileges to patch a subscription.',
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

    const patchValidationError = validatePatch({patch, document: changeableProperties});
    if (patchValidationError) {
      return failure(
        error({
          code: 'InvalidPatch',
          message: 'Provided patch is invalid.',
        }),
        patchValidationError
      );
    }

    const patchedProperties = patchDocument({document: changeableProperties, patch});
    const {valid, errors: validationErrors} = validateChangeableProperties(patchedProperties);
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
      ...patchedProperties,
    };
    const updatedSubscription = await subscriptionRepository.update(patchedSubscription);
    sendSubscriptionSyncMessage({subscription: updatedSubscription, action: 'updated'});

    return success(updatedSubscription);
  };
