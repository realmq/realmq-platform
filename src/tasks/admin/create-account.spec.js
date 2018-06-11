const {duplicate: createDuplicateKeyError} = require('../../repositories/lib/error');
const initCreateAccount = require('./create-account');

describe('The account creation task', () => {
  const newEmail = 'test@example.com';
  const existingEmail = 'existing@example.com';
  const password = 'password';
  let createAccount;

  beforeEach(() => {
    createAccount = initCreateAccount({
      accountRules: {
        async setPassword(account, password) {
          return {...account, password, hashedPassword: 'hash'};
        },
      },
      accountRepository: {
        async create({email, hashedPassword}) {
          if (email === existingEmail) {
            throw createDuplicateKeyError();
          }

          return {email, hashedPassword};
        },
      },
    });
  });

  it('should respond with an account when called with valid data', async () => {
    const {ok, result} = await createAccount({email: newEmail, password});

    expect(ok).toEqual(true);
    expect(result).toBeDefined();
    expect(result.hashedPassword).toBeDefined();
    expect(result.email).toEqual(newEmail);
  });

  it('should fail when called with existing email', async () => {
    const {ok, error} = await createAccount({email: existingEmail, password});

    expect(ok).toEqual(false);
    expect(error).toBeDefined();
    expect(error.code).toEqual('EmailAlreadyTaken');
  });
});
