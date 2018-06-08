module.exports = {
  unauthorized: ({code, message, challenge}) => ({
    status: 401,
    challenge,
    message: {code, message},
  }),
  error: ({code, message}) => ({
    status: 500,
    message: {code, message},
  }),
};
