# RealMQ Platform
![build status](https://drone.rmq.ovh/api/badges/RealMQ/realmq-platform/status.svg)

## Configuration

The app is aware of the following environment variables,
that can also be injected via `.env` file:

| Variable | Description | Default |
|----------|-------------|---------|
| LOG_LEVEL | App wide logging verbosity | `info` |
| PORT | The HTTP Port the server will listen to | `8080` |

## Run

The recommended way of launching the RealMQ platform is using the
[docker compose setup](https://github.com/realmq/dev-env).

Alternatively run:

```bash
npm start
```

## Documentation

* [Architecture](/docs/architecture)
* [Code Style](/docs/code-style)
* [Workflows](/docs/workflow)
* [Specification](/docs/spec)

## License
Copyright (c) 2018-2019 RealMQ GmbH.
Licensed under the [Open Software License version 3.0](LICENSE)
