#!/usr/bin/env node
/* eslint no-await-in-loop: "off" */
const process = require('node:process');
const {createConnection} = require('net');

const connect = ({host, port}) => new Promise((resolve, reject) => {
  const connection = createConnection(port, host);
  connection.once('connect', () => {
    connection.end();
    resolve(connection);
  });
  connection.once('error', error => reject(error));
});

const test = async ({host, port}) => {
  try {
    await connect({host, port});
    return true;
  } catch {
    return false;
  }
};

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time);
});

const main = async argv => {
  const args = argv.slice(2);
  const [endpoints, timeout] = args.reduce(
    ([endpoints, timeout], arg) => {
      if (arg.includes(':')) {
        const [host, port] = arg.split(':');
        endpoints.push({host, port});
      } else {
        timeout = Number.parseInt(arg, 10);
      }

      return [endpoints, timeout];
    },
    [[], 30],
  );

  if (endpoints.length === 0) {
    console.error(`usage: ${argv[1]} <host>:<port> [...<host>:<port>] [timeout]`);
    return 2;
  }

  const start = Date.now();
  let allPresent = false;
  let lastResults = [];
  do {
    lastResults = await Promise.all(endpoints.map(endpoint => test(endpoint)));
    allPresent = lastResults.reduce((acc, present) => acc && present);

    if (!allPresent) {
      if (Date.now() - start > (timeout * 1000)) {
        const resultReport = endpoints.reduce(
          (report, {host, port}, index) => {
            const online = lastResults[index];
            return online ? report : `${report}\n${host}:${port}`;
          },
          '',
        );
        throw new Error(`Timeout connecting to endpoint(s):${resultReport}`);
      }

      await sleep(980);
    }
  } while (!allPresent);
};

(async () => {
  try {
    const code = await main(process.argv);
    process.exit(code);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
})();
