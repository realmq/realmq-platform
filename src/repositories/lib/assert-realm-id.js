/**
 * Ensure the given value is a valid realmId
 * @param {*} realmId The value to check
 * @throws Error
 */
module.exports = realmId => {
  if (!realmId) {
    throw new Error('Missing realmId');
  }

  if (typeof realmId !== 'string') {
    throw new TypeError('Invalid realmId');
  }
};
