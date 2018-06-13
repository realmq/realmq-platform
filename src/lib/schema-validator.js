const Ajv = require('ajv');

/**
 * Build validator
 * @param {object} schema Schema to build validator for
 * @returns {function(object): {valid: boolean, errors: object[]}} Validator
 */
module.exports = schema => {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  return subject => {
    const valid = validate(subject);
    return {valid, errors: validate.errors || []};
  };
};
