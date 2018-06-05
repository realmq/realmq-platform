const initAuthOnPublish = require('./auth-on-publish');
const initResponse = require('./../../../../../lib/test/express/response');

describe('An auth-on-register handler', () => {
  describe('with valid configuration', () => {
    const unauthenticatedClientId = 'unauthenticated-client-id';
    const authorizedClientId = 'authorized-client-id';
    const unauthorizedClientId = 'unauthorized-client-id';
    const unknownClientId = 'unknown-client-id';
    let authOnPublish;
    let responseState;
    let response;

    beforeEach(() => {
      authOnPublish = initAuthOnPublish({
        authenticateClient: async id => {
          switch (id) {
          case authorizedClientId:
          case unauthorizedClientId:
            return {id, authenticated: true};
          case unauthenticatedClientId:
            return {id, authenticated: false};
          default:
            return null;
          }
        },
        authorizePublish: async client => {
          switch (client.id) {
          case authorizedClientId:
            return {authorized: true, internalTopic: 'internal-topic'};
          default:
            return {authorized: false};
          }
        }
      });
      responseState = {};
      response = initResponse(responseState);
    });

    describe('handling a proper request', () => {
      describe('for an authenticated and authorized client', () => {
        it('signals client can connect', async () => {
          // eslint-disable-next-line camelcase
          const request = {body: {client_id: authorizedClientId, topic: 'external-topic'}};
          await authOnPublish(request, response);
          expect(responseState.isSend).toBe(true);
          expect(responseState.status).toBe(200);
          expect(responseState.data).toEqual({
            result: 'ok',
            modifiers: {
              topic: 'internal-topic'
            }
          });
        });
      });
      describe('for an authenticated but unauthorized client', () => {
        it('signals client is not authorized', async () => {
          // eslint-disable-next-line camelcase
          const request = {body: {client_id: unauthorizedClientId, topic: 'external-topic'}};
          await authOnPublish(request, response);
          expect(responseState.isSend).toBe(true);
          expect(responseState.status).toBe(200);
          expect(responseState.data).toEqual({result: {error: 'unauthorized'}});
        });
      });
      describe('for an unauthenticated client', () => {
        it('signals client may be authorized by other source', async () => {
          // eslint-disable-next-line camelcase
          const request = {body: {client_id: unauthenticatedClientId, topic: 'external-topic'}};
          await authOnPublish(request, response);
          expect(responseState.isSend).toBe(true);
          expect(responseState.status).toBe(200);
          expect(responseState.data).toEqual({result: 'next'});
        });
      });
      describe('for an unknown client', () => {
        it('signals client may be authorized by other source', async () => {
          // eslint-disable-next-line camelcase
          const request = {body: {client_id: unknownClientId, topic: 'external-topic'}};
          await authOnPublish(request, response);
          expect(responseState.isSend).toBe(true);
          expect(responseState.status).toBe(200);
          expect(responseState.data).toEqual({result: 'next'});
        });
      });
    });
    describe('handling a odd request', () => {
      it('reponds with failure for missing body', async () => {
        const request = {};
        await authOnPublish(request, response);
        expect(responseState.isSend).toBe(true);
        expect(responseState.status).toBe(400);
      });
      it('reponds with failure for missing client id', async () => {
        const request = {body: {topic: 'external-topic'}};
        await authOnPublish(request, response);
        expect(responseState.isSend).toBe(true);
        expect(responseState.status).toBe(400);
      });
      it('reponds with failure for missing topic', async () => {
        // eslint-disable-next-line camelcase
        const request = {body: {client_id: 'client-id'}};
        await authOnPublish(request, response);
        expect(responseState.isSend).toBe(true);
        expect(responseState.status).toBe(400);
      });
    });
  });
});
