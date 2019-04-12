const Ajv = require('ajv');
const {success, failure} = require('../../lib/result');
const taskError = require('../../lib/error/task');
const {apply: patchDocument, validate: validatePatch} = require('../../lib/json-patch');

/**
 * JSON Schema describing the set of changeable properties
 */
const changeablePropertiesSchemaValidator = (new Ajv()).compile({
  type: 'object',
  additionalProperties: false,
  properties: {
    features: {
      type: 'object',
      additionalProperties: false,
      properties: {
        persistence: {
          type: 'object',
          additionalProperties: false,
          properties: {
            enabled: {
              type: 'boolean',
            },
            duration: {
              type: 'string',
              pattern: '^\\d+[smhd]$',
            },
          },
        },
      },
    },
    properties: {
      type: 'object',
    },
  },
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
 * Init patch channel task
 * @param {ChannelRepository} channelRepository Channel repository
 * @returns {Function} Task
 */
module.exports = ({channelRepository}) =>
  /**
   * @function ClientTasks#patchChannel
   * @param {AuthModel} authToken Authentication
   * @param {string} id Channel id
   * @param {object[]} patch Patch to apply
   * @returns {Result<ChannelModel>}
   */
  async ({authToken, id, patch}) => {
    const {scope, realmId} = authToken;

    if (scope !== 'admin') {
      return failure(taskError({
        code: 'InsufficientPrivileges',
        message: 'Insufficient privileges to patch a channel.',
      }));
    }

    const channel = await channelRepository.findOne({realmId, id});
    if (!channel) {
      return failure(taskError({
        code: 'UnknownChannel',
        message: 'Channel does not exists.',
      }));
    }

    const changeableProperties = {
      features: {...channel.features, persistence: {
        enabled: false,
        duration: undefined,
      }},
      properties: channel.properties || {},
    };

    const patchValidationError = validatePatch({patch, document: changeableProperties});
    if (patchValidationError) {
      return failure(
        taskError({
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
        taskError({
          code: 'InvalidChannel',
          message: 'Invalid channel after applying patch.',
        }),
        validationErrors
      );
    }

    const patchedChannel = {...channel, ...patchedProperties};
    const updatedChannel = await channelRepository.update(patchedChannel);
    return success(updatedChannel);
  };
