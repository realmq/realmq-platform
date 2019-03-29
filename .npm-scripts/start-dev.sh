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

# attach to the logs
docker-compose logs -f --tail 5 platform
