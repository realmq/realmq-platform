const {generateToken} = require('./auth-token');

const isValidBase64
    = string_ => /^(?:[A-Za-z\d+/]{4})*(?:[A-Za-z\d+/]{2}==|[A-Za-z\d+/]{3}=)?$/.test(string_);

describe('The auth token rules', () => {
  describe('for generating an auth token', () => {
    it('should generate an auth token', async () => {
      const token = await generateToken();
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
    });

    it('should base64 encode the auth token', async () => {
      const token = await generateToken();
      expect(isValidBase64(token)).toBe(true);
    });
  });
});
