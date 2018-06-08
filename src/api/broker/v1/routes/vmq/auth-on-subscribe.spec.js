const initAuthOnSubscribe = require('./auth-on-subscribe');
const initResponse = require('./../../../../../lib/test/express/response');

describe('An auth-on-subscribe handler', () => {
  describe('with valid configuration', () => {
    const unauthenticatedClientId = 'unauthenticated-client-id';
    const authorizedClientId = 'authorized-client-id';
    const unauthorizedClientId = 'unauthorized-client-id';
    const unknownClientId = 'unknown-client-id';
    let authOnSubscribe;
    let responseState;
    let response;

    beforeEach(() => {
      authOnSubscribe = initAuthOnSubscribe({
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
        authorizeSubscribe: async (client, subscriptions) => {
          switch (client.id) {
          case authorizedClientId:
            return subscriptions;
          default:
            return subscriptions.map(({topic}) => ({topic, qos: 0x80}));
          }
        },
      });
      responseState = {};
      response = initResponse(responseState);
    });

    describe('handling a proper request', () => {
      describe('for an authenticated and authorized client', () => {
        it('signals client is authorized', async () => {
          const topics = [
            {topic: 'dada', qos: 0},
            {topic: 'dudu', qos: 1},
            {topic: 'dodo', qos: 2},
          ];
          // eslint-disable-next-line camelcase
          const request = {body: {client_id: authorizedClientId, topics}};
          await authOnSubscribe(request, response);
          expect(responseState.isSend).toBe(true);
          expect(responseState.status).toBe(200);
          expect(responseState.data).toEqual({
            result: 'ok',
            topics,
          });
        });
      });
      describe('for an authenticated but unauthorized client', () => {
        it('signals client is not authorized', async () => {
          const topics = [
            {topic: 'dada', qos: 0},
            {topic: 'dudu', qos: 1},
            {topic: 'dodo', qos: 2},
          ];
          // eslint-disable-next-line camelcase
          const request = {body: {client_id: unauthorizedClientId, topics}};
          await authOnSubscribe(request, response);
          expect(responseState.isSend).toBe(true);
          expect(responseState.status).toBe(200);
          expect(responseState.data).toEqual({
            result: 'ok',
            topics: [
              {topic: 'dada', qos: 0x80},
              {topic: 'dudu', qos: 0x80},
              {topic: 'dodo', qos: 0x80},
            ],
          });
        });
      });
      describe('for an unauthenticated client', () => {
        it('signals client may be authorized by other source', async () => {
          // eslint-disable-next-line camelcase
          const request = {body: {client_id: unauthenticatedClientId, topics: []}};
          await authOnSubscribe(request, response);
          expect(responseState.isSend).toBe(true);
          expect(responseState.status).toBe(200);
          expect(responseState.data).toEqual({result: 'next'});
        });
      });
      describe('for an unknown client', () => {
        it('signals client may be authorized by other source', async () => {
          // eslint-disable-next-line camelcase
          const request = {body: {client_id: unknownClientId, topics: []}};
          await authOnSubscribe(request, response);
          expect(responseState.isSend).toBe(true);
          expect(responseState.status).toBe(200);
          expect(responseState.data).toEqual({result: 'next'});
        });
      });
    });
    describe('handling a odd request', () => {
      it('reponds with failure for missing body', async () => {
        const request = {};
        await authOnSubscribe(request, response);
        expect(responseState.isSend).toBe(true);
        expect(responseState.status).toBe(400);
      });
      it('reponds with failure for missing client id', async () => {
        const request = {body: {topics: []}};
        await authOnSubscribe(request, response);
        expect(responseState.isSend).toBe(true);
        expect(responseState.status).toBe(400);
      });
      it('reponds with failure for missing topic', async () => {
        // eslint-disable-next-line camelcase
        const request = {body: {client_id: 'client-id'}};
        await authOnSubscribe(request, response);
        expect(responseState.isSend).toBe(true);
        expect(responseState.status).toBe(400);
      });
    });
  });
});
