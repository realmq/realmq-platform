const initAuthOnRegister = require('./auth-on-register');
const initResponse = require('./../../../../../lib/test/express/response');

describe('An auth-on-register handler', () => {
  describe('with valid configuration', () => {
    const authorizedClientId = 'authorized-client-id';
    const unauthorizedClientId = 'unauthorized-client-id';
    let authOnRegister;
    let responseState;
    let response;

    beforeEach(() => {
      authOnRegister = initAuthOnRegister({
        authorizeRegister: async clientId => {
          return clientId === authorizedClientId;
        },
      });
      responseState = {};
      response = initResponse(responseState);
    });

    describe('handling a proper request', () => {
      describe('for an authorized client', () => {
        it('signals client can connect', async () => {
          // eslint-disable-next-line camelcase
          const request = {body: {client_id: authorizedClientId}};
          await authOnRegister(request, response);
          expect(responseState.isSend).toBe(true);
          expect(responseState.status).toBe(200);
          expect(responseState.data).toEqual({result: 'ok'});
        });
      });
      describe('for an unauthorized client', () => {
        it('signals client may be authorized by other source', async () => {
          // eslint-disable-next-line camelcase
          const request = {body: {client_id: unauthorizedClientId}};
          await authOnRegister(request, response);
          expect(responseState.isSend).toBe(true);
          expect(responseState.status).toBe(200);
          expect(responseState.data).toEqual({result: 'next'});
        });
      });
    });
    describe('handling a odd request', () => {
      it('reponds with failure for missing body', async () => {
        const request = {};
        await authOnRegister(request, response);
        expect(responseState.isSend).toBe(true);
        expect(responseState.status).toBe(400);
      });
      it('reponds with failure for missing client id', async () => {
        const request = {body: {}};
        await authOnRegister(request, response);
        expect(responseState.isSend).toBe(true);
        expect(responseState.status).toBe(400);
      });
    });
  });
});
