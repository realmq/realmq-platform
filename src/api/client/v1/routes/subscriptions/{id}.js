/**
 * @param {object} tasks Tasks
 * @param {ClientTasks} tasks.client Tasks
 * @param {object} mappers Mappers
 * @returns {{get: get, patch: patch, delete: delete}} Method handlers
 */
module.exports = (tasks, mappers) => ({
  /**
   * GET /subscriptions/{id}
   * @param {object} request Request
   * @param {object} response Response
   */
  async get(request, response) {
    const {auth: authToken, params: {id}} = request;

    const {ok, result: subscription, error} = await tasks.client.fetchSubscription({authToken, id});
    if (!ok) {
      throw error;
    }

    if (!subscription) {
      return response.status(404).json({
        code: 'UnknownSubscription',
        message: 'Subscription does not exists.',
      });
    }

    response.json(mappers.subscription(subscription));
  },
  /**
   * PATCH /subscriptions/{id}
   * @param {object} request Request
   * @param {object} response Response
   */
  async patch(request, response) {
    const {auth: authToken, params: {id}, body: patch} = request;

    const {ok, result: subscription, error} = await tasks.client.patchSubscription({authToken, id, patch});
    if (!ok) {
      throw error;
    }

    response.json(mappers.subscription(subscription));
  },
  /**
   * DELETE /subscriptions/{id}
   * @param {object} request Request
   * @param {object} response Response
   */
  async delete(request, response) {
    const {auth: authToken, params: {id}} = request;

    const {ok, error} = await tasks.client.deleteSubscription({authToken, id});
    if (!ok) {
      throw error;
    }

    response.status(204).send();
  },
});
