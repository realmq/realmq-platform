const jsonPatch = require('fast-json-patch');

/**
 * Apply json patch to document
 * @param {object} patch Patch
 * @param {object} document Document to patch
 * @returns {object} Patched document
 */
module.exports = ({patch, document}) => {
  const {newDocument: patchedDocument} =
    jsonPatch.applyPatch(document, patch, false, true);
  return patchedDocument;
};
