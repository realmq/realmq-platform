const initCreateRealm = require('./create-realm');

describe('A createRealm admin task', () => {
  describe('with proper configuration', () => {
    let realmRepository;
    let createRealm;
    beforeEach(() => {
      realmRepository = {create: async obj => obj};
      createRealm = initCreateRealm({realmRepository});
    });

    describe('called with proper account and name', () => {
      const account = {id: '5'};
      const name = 'Test Realm';
      const realm = {name, ownerAccountId: '5'};

      it('returns realm model in result object', async () => {
        const result = await createRealm({account, name});
        expect(result).toMatchObject({
          ok: true,
          result: realm,
        });
      });

      describe('confronted with an error', () => {
        beforeEach(() => {
          realmRepository.create = () => Promise.reject(new Error('test'));
        });
        it('forwards that error', () => {
          return expect(createRealm({account, id: '5'})).rejects.toThrow();
        });
      });
    });
  });
});
