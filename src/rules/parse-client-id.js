const SEPARATOR = ':';

/**
 * @param {string} clientId
 * @returns {string}
 */
function parseClientId(clientId) {
  if (!clientId) {
    return clientId;
  }

  // consider everything BEFORE separator as token.
  return clientId.split(SEPARATOR)[0];
}


module.exports = {
  parseTokenFromClientId: parseClientId
}
