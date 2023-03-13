const jsonPatch = require('fast-json-patch');

/**
 * Validate json patch
 * @param {object} patch Patch
 * @param {object} [document] Reference document to check patch for
 * @returns {object} Patched document
 */
module.exports = ({patch, document = null}) => jsonPatch.validate(patch, document);
