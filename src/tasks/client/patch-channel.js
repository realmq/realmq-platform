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
      return failure(error({
        code: 'InsufficientPrivileges',
        message: 'Insufficient privileges to patch a channel.',
      }));
    }

    const channel = await channelRepository.findOne({realmId, id});
    if (!channel) {
      return failure(error({
        code: 'UnknownChannel',
        message: 'Channel does not exists.',
      }));
    }

    const changeableProperties = {
      features: Object.assign({}, channel.features, {
        persistence: {
          enabled: false,
          duration: undefined,
        },
      }),
      properties: channel.properties || {},
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

    const patchedProperties = jsonPatch.applyPatch(changeableProperties, patch);
    const {valid, errors: validationErrors} = validateChangeableProperties(patchedProperties);
    if (!valid) {
      return failure(
        error({
          code: 'InvalidChannel',
          message: 'Invalid channel after applying patch.',
        }),
        validationErrors
      );
    }

    const patchedChannel = {...channel, ...patchedProperties};
    const updatedChannel = channelRepository.update(patchedChannel);
    return success(updatedChannel);
  };
