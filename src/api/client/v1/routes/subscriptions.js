/**
 * @param {object} tasks Tasks
 * @param {ClientTasks} tasks.client Tasks
 * @param {object} mappers Mappers
 * @returns {{get: get, post: post}} Method handlers
 */
module.exports = (tasks, mappers) => ({
  /**
   * GET /subscriptions
   * @param {object} request Request
   * @param {object} response Response
   */
  async get(request, response) {
    const {auth: authToken, query: {offset, limit}} = request;
    const {ok, result: list, error}
      = await tasks.client.listSubscriptions({authToken, offset, limit});

    if (!ok) {
      throw error;
    }

    response.json(mappers.subscriptionList(list));
  },
  /**
   * POST /subscriptions
   * @param {object} request Request
   * @param {object} response Response
   */
  async post(request, response) {
    const {auth: authToken, body: data} = request;

    const {ok, result: subscription, error}
      = await tasks.client.createSubscription({authToken, data});

    if (!ok) {
      throw error;
    }

    response.status(201).json(mappers.subscription(subscription));
  },
});
