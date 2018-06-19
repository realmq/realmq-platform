const {promisify} = require('util');
const {randomBytes} = require('crypto');
const buildAuth = require('../models/auth');

const generateRandomBytesBuffer = promisify(randomBytes);

/**
 * @param {number} [bytes] The number of token bytes.
 * @return {Promise<string>} The generated token.
 */
const generateToken = async ({bytes = 64} = {}) => {
  const buffer = await generateRandomBytesBuffer(bytes);
  return buffer.toString('base64');
};

/**
 * @class AuthTokenRules
 */
module.exports = {
  generateToken,
  buildEntity: async data => buildAuth({
    token: await generateToken(),
    ...data,
  }),
};
