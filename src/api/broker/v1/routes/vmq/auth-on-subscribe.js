/**
 *
 * @param {BrokerTasks#authenticateClient} authenticateClient Task
 * @param {BrokerTasks#authorizeSubscribe} authorizeSubscribe Task
 * @returns {BrokerV1VmqRoutes#authOnSubscribe} Handler
 */
module.exports = ({authenticateClient, authorizeSubscribe}) =>
  /**
   * @function BrokerV1VmqRoutes#authOnSubscribe
   * @param {object} request Request
   * @param {object} request.body Body
   * @param {string} request.body.client_id Client ID
   * @param {object} response Response
   * @returns {Promise<void>} Nothing
   */
  async (request, response) => {
    const {client_id: clientId, topics: subscriptions} = request.body || {};
    if (
      !clientId
      || !subscriptions
    ) {
      return response.status(400).send();
    }

    const client = await authenticateClient(clientId);
    if (!client || !client.authenticated) {
      // Skip authorization for unknown clients
      return response.json({result: 'next'});
    }

    const authorizedSubscriptions = await authorizeSubscribe(client, subscriptions);
    response
      .set({'Cache-Control': 'max-age=60'})
      .json({result: 'ok', topics: authorizedSubscriptions});
  };
