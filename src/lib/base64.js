module.exports = {
  /**
   * Decode base64
   * @param {string} value Base64 encoded value
   * @returns {string} Plain text value
   */
  decode: value => Buffer.from(value, 'base64').toString(),
  /**
   * Encode base64
   * @param {string} value Plain text value
   * @returns {string} Base64 encoded value
   */
  encode: value => Buffer.from(value).toString('base64'),
};
