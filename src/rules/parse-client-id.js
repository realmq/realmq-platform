const SEPARATOR = ':';

/**
 * @param {string} clientId
 * @returns {string}
 */
function extractTokenFromClientId(clientId) {
  if (!clientId) {
    return clientId;
  }

  // Consider everything BEFORE separator as token.
  return clientId.split(SEPARATOR)[0];
}

module.exports = {
  extractTokenFromClientId,
};
