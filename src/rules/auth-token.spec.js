const {generateToken} = require('./auth-token');

const isValidBase64 =
    str => /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(str);

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
