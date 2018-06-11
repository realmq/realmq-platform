const ajv = require('ajv');
const stripUndefined = require('../lib/strip-undefined');

/**
 * @name ChannelModel.schema
 */
const schema = {
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
 * @function ChannelMode.validate
 * @param {*} data Data to validate
 * @returns {{valid: boolean, errors: *[]}} Valid or not
 */
const validate = data => {
  const valid = ajv.validate(schema, data);
  return {valid, errors: valid ? [] : ajv.errors};
};

/**
 * @class ChannelModel
 * @param {string} id
 * @param {string} realmId
 * @param {Object} features
 * @param {Object} [properties]
 * @param {Date} [createdAt]
 * @param {Date} [updatedAt]
 */

/**
 * @return {ChannelModel} The generalized channel model
 */
const ChannelModel = ({
  id,
  realmId,
  features,
  properties,
  createdAt,
  updatedAt,
}) => stripUndefined({
  id,
  realmId,
  features,
  properties,
  createdAt,
  updatedAt,
});
ChannelModel.schema = schema;
ChannelModel.validate = validate;

module.exports = ChannelModel;
