const createLookupQuery = require('./create-lookup-query');

describe('The client auth createLookupQuery module', () => {
  const params = {
    scope: 'user',
    realmId: 'realm-id',
    userId: 'user-id',
  };

  it('should create a query containing the realm id', () => {
    const query = createLookupQuery(params);

    expect(query.realmId).toEqual(params.realmId);
  });

  describe('when called with an admin scope', () => {
    it('should create a query without user id', () => {
      const query = createLookupQuery({...params, scope: 'admin'});

      expect(query.userId).not.toBeDefined();
    });
  });

  describe('when called with a non-admin scope', () => {
    it('should create a query with user id', () => {
      const query = createLookupQuery(params);

      expect(query.userId).toEqual(params.userId);
    });
  });

  describe('when called with an id', () => {
    it('should create a query with that id', () => {
      const id = 'test-id';
      const query = createLookupQuery({...params, id});

      expect(query.id).toEqual(id);
    });
  });

  describe('when called without an id', () => {
    it('should create a query without id', () => {
      const query = createLookupQuery(params);

      expect(query.id).not.toBeDefined();
    });
  });
});
