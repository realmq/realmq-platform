#!/usr/bin/env bash

# Stop services when user hits Ctrl+C
on_exit() {
  docker-compose stop
  exit 0
}

trap "on_exit" SIGINT

if [[ ! -f .env ]]; then
  echo -e "\e[1;34m☞\e[0m Setting up \e[1m.env\e[0m file. Here you can adjust dev setup configuration."
  echo -e "\e[1;34m☞\e[0m See \e[4msrc/config/README.md\e[0m for a complete list of configuration options."
  echo ""
  cp .env.template .env
fi

# make sure the latest dependencies are installed
npm install

# launch docker setup
docker-compose up -d

# what a little until mongo has started
sleep 2

# copy dev root ca certificate to user space
if [[ ! -f certs/dev-ca-root.crt.pem ]]; then
  echo -e "\e[1;34m☞\e[0m Setting up \e[1mTLS certificates\e[0m.\nCopy dev ROOT CA certificate to \e[4mcerts/dev-ca-root.crt.pem\e[0m."
  mkdir certs
  docker cp $(docker-compose ps -q certificates | head -1):/data/certificates/root.crt.pem certs/dev-ca-root.crt.pem
fi

# attach to the logs
docker-compose logs -f --tail 5 platform
