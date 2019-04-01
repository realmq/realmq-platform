<h1 align="center">
  <img src="media/realmq-platform-logo.svg" alt="RealMQ Logo" />
  <br><br>
</h1>

![RealMQ Platform Build Status](https://drone.rmq.ovh/api/badges/RealMQ/realmq-platform/status.svg)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Frealmq%2Frealmq-platform.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Frealmq%2Frealmq-platform?ref=badge_shield)

# RealMQ :rocket: Open Source Real-time Messaging Platform

[RealMQ](https://realmq.com) is a free and open source backbone for real-time telecommunication use-cases.


## Configuration

The app can be configured via environment variables, that can also be injected via `.env` file.
For a complete list of configuration options see [config docs](./src/config/README.md).

## Run
The RealMQ platform comes with a docker compose setup aimed for local development.<br/>
To get you started, simply run:

```bash
npm run dev
```
This command will:
- :checkered_flag: setup `.env` file
- :package: fetch and install all dependencies.
- :robot: launch the mqtt broker on localhost:1883 
- :whale: launch the app on http://localhost:8080
- :fire: code reload - restart app upon code changes

## Documentation

* [Architecture](/docs/architecture)
* [Code Style](/docs/code-style)
* [Workflows](/docs/workflow)
* [Specification](/docs/spec)

## License
Copyright (c) 2018-2019 RealMQ GmbH.<br/>
Licensed under the [Open Software License version 3.0](LICENSE)


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Frealmq%2Frealmq-platform.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Frealmq%2Frealmq-platform?ref=badge_large)