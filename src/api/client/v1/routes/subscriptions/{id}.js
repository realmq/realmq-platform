/**
 * @param {object} tasks Tasks
 * @param {ClientTasks} tasks.client Tasks
 * @param {object} mappers Mappers
 * @returns {{get: get, patch: patch, delete: delete}} Method handlers
 */
module.exports = (tasks, mappers) => ({
  /**
   * GET /subscriptions/{id}
   * @param {object} req Request
   * @param {object} res Response
   */
  get: async (req, res) => {
    const {auth: authToken, params: {id}} = req;

    const {ok, result: subscription, error} = await tasks.client.fetchSubscription({authToken, id});
    if (!ok) {
      throw error;
    }

    if (subscription === null) {
      res.status(404);
    } else {
      res.json(mappers.subscription(subscription));
    }
  },
  /**
   * PATCH /subscriptions/{id}
   * @param {object} req Request
   * @param {object} res Response
   */
  patch: async (req, res) => {
    const {auth: authToken, params: {id}, body: patch} = req;

    const {ok, result: subscription, error} = await tasks.client.patchSubscription({authToken, id, patch});
    if (!ok) {
      throw error;
    }

    res.json(mappers.subscription(subscription));
  },
  /**
   * DELETE /subscriptions/{id}
   * @param {object} req Request
   * @param {object} res Response
   */
  delete: async (req, res) => {
    const {auth: authToken, params: {id}} = req;

    const {ok, error} = await tasks.client.deleteSubscription({authToken, id});
    if (!ok) {
      throw error;
    }

    res.status(204).send();
  },
});
