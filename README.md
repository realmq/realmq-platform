# RealMQ Platform
![build status](https://drone.rmq.ovh/api/badges/RealMQ/realmq-platform/status.svg)

## Configuration

The app can be configured via environment variables, that can also be injected via `.env` file.
For a complete list of configuration options see [config docs](./src/config/README.md).

## Run
The RealMQ platform comes with a docker compose setup aimed for local development.
To get you started, simply run:

```bash
npm run dev
```

By default the app will be launched on http://localhost:8080.

## Documentation

* [Architecture](/docs/architecture)
* [Code Style](/docs/code-style)
* [Workflows](/docs/workflow)
* [Specification](/docs/spec)
