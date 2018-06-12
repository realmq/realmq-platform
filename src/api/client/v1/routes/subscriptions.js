/**
 * @param {object} tasks Tasks
 * @param {ClientTasks} tasks.client Tasks
 * @param {object} mappers Mappers
 * @returns {{get: get, post: post}} Method handlers
 */
module.exports = (tasks, mappers) => ({
  /**
   * GET /subscriptions/{id}
   * @param {object} req Request
   * @param {object} res Response
   */
  get: async (req, res) => {
    const {auth: authToken, query: {offset, limit}} = req;
    const {ok, result: list, error} =
      await tasks.client.listSubscriptions({authToken, offset, limit});

    if (!ok) {
      throw error;
    }

    res.json(mappers.subscriptionList(list));
  },
  /**
   * POST /subscriptions/{id}
   * @param {object} req Request
   * @param {object} res Response
   */
  post: async (req, res) => {
    const {auth: authToken, body: data} = req;

    const {ok, result: subscription, error} =
      await tasks.client.createSubscription({authToken, data});

    if (!ok) {
      throw error;
    }

    res.status(201).json(mappers.subscription(subscription));
  },
});
