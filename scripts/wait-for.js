#!/usr/bin/env node
/* eslint no-await-in-loop: "off" */

const {createConnection} = require('net');

const connect = (host, port) => new Promise((resolve, reject) => {
  const connection = createConnection(port, host);
  connection.once('connect', () => resolve(connection));
  connection.once('error', err => reject(err));
});

const test = async (host, port) => {
  try {
    await connect(host, port);
    return true;
  } catch (_) {
    return false;
  }
};

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

const main = async argv => {
  const [host, port, timeout = 30] = argv.slice(2);
  if (!host || !port) {
    console.error(`usage: ${argv[1]} <host> <port> [timeout]`);
    return 2;
  }

  const start = Date.now();
  let present = false;
  while (!present) {
    if (Date.now() - start > (timeout * 1000)) {
      throw new Error(`Timeout connecting to ${host}:${port}`);
    }
    await sleep(980);
    present = await test(host, port);
  }
};

(async () => {
  try {
    const code = await main(process.argv);
    process.exit(code);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
})();
