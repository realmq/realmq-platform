const initListRealms = require('./list-realms');

describe('The list realms task', () => {
  const account = {id: 'account-id'};
  const realms = [{id: 'realm-id', name: 'realm-name'}];
  let listRealms;

  beforeEach(() => {
    listRealms = initListRealms({
      realmRepository: {
        async find() {
          return realms;
        },
      },
    });
  });

  it('should respond successfully with a list of realms for an account', async () => {
    const {ok, result} = await listRealms({account, offset: 0, limit: 1});

    expect(ok).toEqual(true);
    expect(result).toEqual(realms);
  });

  it('should not fail without pagination params', async () => {
    const {ok, result} = await listRealms({account});

    expect(ok).toEqual(true);
    expect(result).toEqual(realms);
  });
});
