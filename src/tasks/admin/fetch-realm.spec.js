const initFetchRealm = require('./fetch-realm');

describe('A fetchRealm admin task', () => {
  describe('with proper configuration', () => {
    let realmRepository;
    let realmLimitsRepository;
    let fetchRealm;
    beforeEach(() => {
      realmRepository = {findOne: async () => null};
      realmLimitsRepository = {findOneByRealmId: async () => null};
      fetchRealm = initFetchRealm({realmRepository, realmLimitsRepository});
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
          result: {realm},
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
          result: {realm: null},
        });
      });
    });

    describe('confronted with an error', () => {
      beforeEach(() => {
        realmRepository.findOne = () => {
          throw new Error('test');
        };
      });
      it('forwards that error', () => expect(fetchRealm({id: '5'})).rejects.toThrow());
    });
  });
});
