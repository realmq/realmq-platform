# RealMQ Platform
![build status](https://drone.rmq.ovh/api/badges/RealMQ/realmq-platform/status.svg)

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
- setup `.env` file :checkered_flag:
- fetch and install all dependencies. :package: :whale:
- launch the mqtt broker on localhost:1883 :robot:
- launch the app on http://localhost:8080 :whale:
- :fire: code reload - restart app upon code changes

## Documentation

* [Architecture](/docs/architecture)
* [Code Style](/docs/code-style)
* [Workflows](/docs/workflow)
* [Specification](/docs/spec)

## License
Copyright (c) 2018-2019 RealMQ GmbH.
Licensed under the [Open Software License version 3.0](LICENSE)
