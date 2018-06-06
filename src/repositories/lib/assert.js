function assertSomeId(value, fieldName) {
  if (!value) {
    throw new Error(`Missing ${fieldName}`);
  }

  if (typeof value !== 'string') {
    throw new TypeError(`Invalid ${fieldName}`);
  }
}

module.exports = {
  /**
   * Ensure the given value is a valid id
   * @param {*} id The value to check
   * @throws Error
   * @return {void}
   */
  id: id => assertSomeId(id, 'id'),

  /**
   * Ensure the given value is a valid realmId
   * @param {*} realmId The value to check
   * @throws Error
   * @return {void}
   */
  realmId: realmId => assertSomeId(realmId, 'realmId')
};
