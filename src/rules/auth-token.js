const {promisify} = require('util');
const {randomBytes} = require('crypto');

const generateRandomBytesBuffer = promisify(randomBytes);

/**
 * @class AuthTokenRules
 */
module.exports = {
  /**
   * @param {number} [bytes] The number of token bytes.
   * @return {Promise<string>} The generated token.
   */
  async generateToken({bytes = 64} = {}) {
    const buffer = await generateRandomBytesBuffer(bytes);
    return buffer.toString('base64');
  },
};
