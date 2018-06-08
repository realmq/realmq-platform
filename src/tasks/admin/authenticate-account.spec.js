const initAuthenticateAccount = require('./authenticate-account');

describe('The authentication task for accounts', () => {
  const knownEmail = 'test@example.com';
  const unknownEmail = 'unknown@example.com';
  const validPassword = 'valid-password';
  const invalidPassword = 'invalid-password';
  const account = {email: knownEmail};
  let authenticateAccount;

  beforeEach(() => {
    authenticateAccount = initAuthenticateAccount({
      accountRepository: {
        async findOneByEmail(email) {
          return email === knownEmail ? account : null;
        },
      },
      accountRules: {
        async checkPassword(account, password) {
          return password === validPassword;
        },
      },
    });
  });

  it('should authenticate a valid account', async () => {
    const {authenticated, account: authenticatedAccount} = await authenticateAccount({
      email: knownEmail,
      password: validPassword,
    });

    expect(authenticated).toEqual(true);
    expect(authenticatedAccount).toEqual(account);
  });

  it('should not authenticate an account with unknown email', async () => {
    const {authenticated} = await authenticateAccount({
      email: unknownEmail,
      password: validPassword,
    });

    expect(authenticated).toEqual(false);
  });

  it('should not authenticate an account with invalid password', async () => {
    const {authenticated} = await authenticateAccount({
      email: knownEmail,
      password: invalidPassword,
    });

    expect(authenticated).toEqual(false);
  });
});
