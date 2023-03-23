/**
 *
 * @param {{client: ClientTasks}} tasks Tasks
 * @param {ClientApiV1Mappers} mappers Mappers
 * @returns {{get: get, post: post}} Method handlers
 */
module.exports = (tasks, mappers) => ({
  /**
   * GET /auth/tokens
   * @param {object} request Request
   * @param {object} response Response
   */
  async get(request, response) {
    const {auth: authToken, query: {offset, limit}} = request;
    const {ok, result: list, error}
      = await tasks.client.listAuths({authToken, offset, limit});

    if (!ok) {
      throw error;
    }

    response.json(mappers.authList(list));
  },
  /**
   * POST /auth/tokens
   * @param {object} request Request
   * @param {object} response Response
   */
  async post(request, response) {
    const {auth: authToken, body: data} = request;

    const {ok, result: createdAuthToken, error}
      = await tasks.client.createAuth({authToken, data});

    if (!ok) {
      throw error;
    }

    response.status(201).json(mappers.authWithToken(createdAuthToken));
  },
});
