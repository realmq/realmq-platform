const {setPassword, checkPassword} = require('./account');

describe('The account rules', () => {
  let account;
  let password;

  beforeEach(() => {
    account = {email: 'test@example.com'};
    password = 'testpassword';
  });

  describe('for setting a password', () => {
    it('should enrich an account model with password hash', async () => {
      const accountWithPassword = await setPassword(account, password);
      expect(accountWithPassword.passwordHash).toBeDefined();
    });

    it('should not store the password in clear text', async () => {
      const accountWithPassword = await setPassword(account, password);
      expect(accountWithPassword.passwordHash).not.toEqual(password);
    });
  });

  describe('for validating a password', () => {
    it('should validate a valid password', async () => {
      const accountWithPassword = await setPassword(account, password);
      const isValid = await checkPassword(accountWithPassword, password);
      expect(isValid).toEqual(true);
    });

    it('should not validate an invalid password', async () => {
      const accountWithPassword = await setPassword(account, password);
      const isValid = await checkPassword(accountWithPassword, 'invalidpassword');
      expect(isValid).toEqual(false);
    });
  });
});
