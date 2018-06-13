/**
 *
 * @param {{client: ClientTasks}} tasks Tasks
 * @param {ClientApiV1Mappers} mappers Mappers
 * @returns {{get: get, post: post}} Method handlers
 */
module.exports = (tasks, mappers) => ({
  /**
   * GET /auth/tokens
   * @param {object} req Request
   * @param {object} res Response
   */
  get: async (req, res) => {
    const {auth: authToken, query: {offset, limit}} = req;
    const {ok, result: list, error} =
      await tasks.client.listAuths({authToken, offset, limit});

    if (!ok) {
      throw error;
    }

    res.json(mappers.authList(list));
  },
  /**
   * POST /auth/tokens
   * @param {object} req Request
   * @param {object} res Response
   */
  post: async (req, res) => {
    const {auth: authToken, body: data} = req;

    const {ok, result: createdAuthToken, error} =
      await tasks.client.createAuth({authToken, data});

    if (!ok) {
      throw error;
    }

    res.status(201).json(mappers.auth(createdAuthToken));
  },
});
