const initFetchRealm = require('./fetch-realm');

describe('A fetchRealm admin task', () => {
  describe('with proper configuration', () => {
    let realmRepository;
    let fetchRealm;
    beforeEach(() => {
      realmRepository = {findOne: async () => null};
      fetchRealm = initFetchRealm({realmRepository});
    });

    describe('for existing realm', () => {
      const realm = {id: '23'};
      beforeEach(() => {
        realmRepository.findOne = async () => realm;
      });
      it('returns realm model in result object', async () => {
        const result = await fetchRealm({id: '5'});
        expect(result).toMatchObject({
          ok: true,
          result: realm,
        });
      });
    });

    describe('for non existing realm', () => {
      beforeEach(() => {
        realmRepository.findOne = async () => null;
      });
      it('returns null in result object', async () => {
        const result = await fetchRealm({id: '5'});
        expect(result).toMatchObject({
          ok: true,
          result: null,
        });
      });
    });

    describe('confronted with an error', () => {
      beforeEach(() => {
        realmRepository.findOne = () => Promise.reject(new Error('test'));
      });
      it('forwards that error', () => {
        return expect(fetchRealm({id: '5'})).rejects.toThrow();
      });
    });
  });
});
