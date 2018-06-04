/**
 *
 * @param {BrokerTasks#authenticateClient} authenticateClient Task
 * @param {BrokerTasks#authorizePublish} authorizePublish Task
 * @returns {BrokerV1VmqRoutes#authOnPublish} Handler
 */
module.exports = ({authenticateClient, authorizePublish}) =>
  /**
   * @function BrokerV1VmqRoutes#authOnPublish
   * @param {object} request Request
   * @param {object} response Response
   * @returns {Promise<void>} Nothing
   */
  async (request, response) => {
    const {client_id: clientId, topic} = request.body || {};
    if (
      !clientId ||
      !topic
    ) {
      return response.status(400).send();
    }

    const client = await authenticateClient(clientId);
    if (!client || !client.authenticated) {
      // Skip authorization for unknown clients
      return response.json({result: 'next'});
    }

    const authorization = await authorizePublish(client, topic);
    if (!authorization.authorized) {
      return response.json({result: {error: 'unauthorized'}});
    }
    response
      .set({'Cache-Control': 'max-age=60'})
      .json({result: 'ok', modifiers: {topic: authorization.internalTopic}});
  };
