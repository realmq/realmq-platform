const createLookupQuery = require('./create-lookup-query');

describe('The client auth createLookupQuery module', () => {
  const parameters = {
    scope: 'user',
    realmId: 'realm-id',
    userId: 'user-id',
  };

  it('should create a query containing the realm id', () => {
    const query = createLookupQuery(parameters);

    expect(query.realmId).toEqual(parameters.realmId);
  });

  describe('when called with an admin scope', () => {
    it('should create a query without user id', () => {
      const query = createLookupQuery({...parameters, scope: 'admin'});

      expect(query.userId).not.toBeDefined();
    });
  });

  describe('when called with a non-admin scope', () => {
    it('should create a query with user id', () => {
      const query = createLookupQuery(parameters);

      expect(query.userId).toEqual(parameters.userId);
    });
  });

  describe('when called with an id', () => {
    it('should create a query with that id', () => {
      const id = 'test-id';
      const query = createLookupQuery({...parameters, id});

      expect(query.id).toEqual(id);
    });
  });

  describe('when called without an id', () => {
    it('should create a query without id', () => {
      const query = createLookupQuery(parameters);

      expect(query.id).not.toBeDefined();
    });
  });
});
