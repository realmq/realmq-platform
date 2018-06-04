/**
 *
 * @param {BrokerTasks#authorizeRegister} authorizeRegister Task
 * @returns {BrokerV1VmqRoutes#authOnRegister} Handler
 */
module.exports = ({authorizeRegister}) =>
  /**
   * @function BrokerV1VmqRoutes#authOnRegister
   * @param {object} request Request
   * @param {object} response Response
   * @returns {Promise<void>} Nothing
   */
  async (request, response) => {
    const {client_id: clientId} = request.body || {};
    if (!clientId) {
      return response.status(400).send();
    }

    const authorized = await authorizeRegister(clientId);
    const result = authorized ? 'ok' : 'next';
    response.json({result});
  };
