<h1 align="center">
  <img src="media/realmq-platform-logo.svg" alt="RealMQ Logo" />
  <br><br>
</h1>

![RealMQ Platform Build Status](https://drone.rmq.ovh/api/badges/RealMQ/realmq-platform/status.svg)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Frealmq%2Frealmq-platform.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Frealmq%2Frealmq-platform?ref=badge_shield)
[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/realmq)

# RealMQ :rocket: Open Source Real-time Messaging Platform

[RealMQ](https://realmq.com) is a free and open source backbone for real-time communication.
Our core values are **performance** and **integrability**.
The platform is built around a convenient REST-API to manage access control, data channels and users/devices.
Messages, events and data are exchanged via the battle proven MQTT protocol which is lightweight, fast and well established in the world of IoT.
Clients connect to our highly scalable MQTT broker that takes care of delivering messages to all connected subscribers.
On top of this slim but flexible core you can build awesome realtime products and services around use-cases like:

* Device to device communication
* Exchange signals / send and receive realtime events
* Broadcast messages or events to segmented users
* Aggregate and dispatch data
* Emit sensor/IoT Device data
* Chat

## Features
### REST API
We follow the API first approach, as we see our API as the central component in our architecture.
Our mission is to build a developer friendly API with industry standard patterns and
tools like RESTful design principles and an OpenAPI specification.
It goes without saying that all requests are TLS encrypted and authentication is backed by security tokens (Bearer authentication).

### Message Persistence
Message history can be enabled and fine tuned on channel level.
Once enabled, all messages published to the channel will be kept for a configured amount of time.
Persisted messages can be retrieved via API history resource.

<details>
<summary>Explore code samples</summary>
<br>

[![Using RealMQ via Node SDK](https://badgen.net/badge/-/Node%20SDK/purple?icon=awesome&label "Using RealMQ via Node SDK")](https://realmq.com/docs/node-sdk)
[![Using RealMQ via Web SDK](https://badgen.net/badge/-/Web%20SDK/purple?icon=awesome&label "Using RealMQ via Web SDK")](https://realmq.com/docs/web-sdk)

```js
// Create a new channel that keeps messages for 2 weeks 
const channel = await realmq.channels.create({
  history: '2 weeks'
});

// Retrieve the history (last 20 messages)
const history = await realmq.history.query({
  channel,
  limit: 20
});

```

[![Using RealMQ via CURL](https://badgen.net/badge/example/CURL/purple?icon=awesome&label "Using RealMQ via CURL")](https://realmq.com/docs/client-api)

```bash
curl -X POST -H 'Authorization: Bearer token...' -H 'Content-Type: application/json' \
     -d '{"history": "2 weeks"}' \
     https://api.realmq.com/client/v1/channels
     
curl -H 'Authorization: Bearer token...' \
     https://api.realmq.com/client/v1/channels/:channelId/history?limit=20
```

</details>

### Custom Ids
It’s just a little detail that manifests the seamless integration into your stack:
All API resources can be operated with optional custom ids.
[read more](https://realmq.com/docs/knowledge-base/#custom-ids)

<details>
<summary>Explore code samples</summary>
<br>

[![Using RealMQ via Node SDK](https://badgen.net/badge/-/Node%20SDK/purple?icon=awesome&label "Using RealMQ via Node SDK")](https://realmq.com/docs/node-sdk)
[![Using RealMQ via Web SDK](https://badgen.net/badge/-/Web%20SDK/purple?icon=awesome&label "Using RealMQ via Web SDK")](https://realmq.com/docs/web-sdk)

```js
// Create resources with custom ids
const channel = await realmq.channels.create({ id: 'custom-channel-id' });
console.log(channel.id); // => custom-channel-id

// Retrieve resources with custom ids
const channel = await realmq.channels.retrieve('custom-channel-id');

// Or get an id auto generated
const channel = await realmq.channels.create();
console.log(channel.id) // => 20f62e87-e689-4a11-bcf3-a78026fffd85

```

[![Using RealMQ via CURL](https://badgen.net/badge/example/CURL/purple?icon=awesome&label "Using RealMQ via CURL")](https://realmq.com/docs/client-api/)

```bash
# Create resources with custom ids
curl -X POST -H 'Authorization: Bearer token...' -H 'Content-Type: application/json' \
     -d '{"id": "custom-channel-id"}' \
     https://api.realmq.com/client/v1/channels

# Retrieve resources with custom ids
curl -H 'Authorization: Bearer token...' /
     https://api.realmq.com/client/v1/channels/custom-channel-id

# Or get an id auto generated
curl -X POST -H 'Authorization: Bearer token...' \
     https://api.realmq.com/client/v1/channels
```

</details>

### Realms
The RealMQ platform comes with built in **multi-tenancy** / project support.
You have the ability to operate multiple, **isolated data containers**.
Our so-called Realms make it a breeze to setup clean separation of different applications and **launch on-the-fly environments** (like prod, test, demo).
Realms are completely transparent to clients, as we are able to route all RTM and API calls into the correct Realm via auth tokens.
For Realm administration and access management you can operate directly against a **dedicated administration api**.

### SDKs
We provide SDKs for [NodeJS](https://github.com/realmq/realmq-node-sdk) and the [Browser](https://github.com/realmq/realmq-web-sdk).
Other major platforms will follow.
The SDKs aim for seamless integration and hence provide you with a convenient interface for interacting with our platform and are first class helpers for building reactive realtime apps.

<details>
<summary>Explore code sample</summary>
<br>

[![Using RealMQ via Node SDK](https://badgen.net/badge/-/Node%20SDK/purple?icon=awesome&label "Using RealMQ via Node SDK")](https://realmq.com/docs/node-sdk)

```js
import RealMQ from '@realmq/node-sdk';
// Initialize with auth token
const realmq = RealMQ('sub_kg2...');

// Publish messages of any format
realmq.rtm.publish('some-channel', {
  status: 'Exited!'
});

// Subscribe to real-time updates
realmq.rtm.subscribe('some-channel', msg => {
  console.log('Horay! New message received:', msg);
});

// Retrieve subscriptions
const subscriptions = await realmq.subscriptions.list();
```

</details>

### Security & Encryption
The RealMQ platform comes with fine grained access control capabilities, that can be managed via API.
We don’t enforce a specific content type for the messages that are sent between clients.
It’s totally up to you to decide what the payload contains.
This allows for easy integration of any kind of end-to-end encryption for messages.
On top of our TLS this establishes an additional security layer. 


## Roadmap
:1st_place_medal: Help up prioritize our backlog with your votes and comments on the features you are most exited about.

* **CLI Tool**: Operate the RealMQ platform from the command line. (#86)
* **Public Cloud Service**: Free developer tier and pay-as-you-go subscriptions. (#87) Reach out to service@realmq.com for beta access.
* **Dashboard**: A web app for account-, realm management and monitoring. (#88)
* **Webhooks**: Integrate RealMQ via http/webhook (#85)
* **Channel Pipes**: Message routing & enrichment (#89)
* **Multi-Channel**: SMS, email, push integration (#90)

:+1: And you are more then welcome to start a discussion and [suggest a new feature](https://github.com/realmq/realmq-platform/issues/new).

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
- :lock: generate TLS certificates and setup local dns for `[api.|rtm.]realmq.local`
- :robot: launch the mqtt broker on rtm.realmq.local:1883 
- :whale: launch the app on https://api.realmq.local
- :fire: code reload - restart app upon code changes

### Setting up TLS certificate
`npm run dev` generates self-signed certificates. In order to trust them on your machine, import the ROOT CA cert from `certs/dev-ca-root.crt.pem`.

* **Firefox**: Go to "Preferences > Advanced > Certificates > View Certificates > Authorities > Import" and select the CA certificate.
* **Chrome**: Go to "Settings > Manage Certificates > Authorities > Import" and select the CA certificate.

## Documentation

* [Knowlage Base](https://realmq.com/docs/knowledge-base/)
* [Node SDK](https://realmq.com/docs/node-sdk/)
* [Web SDK](https://realmq.com/docs/web-sdk/)
* [Client API Browser](https://realmq.com/docs/client-api/)
* [Architecture](/docs/architecture)
* [Code Style](/docs/code-style)
* [Workflows](/docs/workflow)
* [Specification](/docs/spec)

## License
Copyright (c) 2018-2019 RealMQ GmbH.<br/>
Licensed under the [Open Software License version 3.0](LICENSE)


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Frealmq%2Frealmq-platform.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Frealmq%2Frealmq-platform?ref=badge_large)
