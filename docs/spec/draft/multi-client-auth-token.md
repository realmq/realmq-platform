# Multiple Client Connections With Single Auth Token

## Goal
In the context of a web browser its very inconvenient to generate a auth token
per client connection. If the same web app runs multiple times in parallel (e.g.
in multiple tabs or browser windows) it has to fetch a new auth token for each
instance or implement internal multiplexing via web worker or something similar.

Therefor RealMQ should allow multiple connections per auth token.

## Cost
tbd

## Risks
- With the one connection per auth token rule we have a connection limit build
  in. This will be lost so we have to add some logic to enforce connection
  limits to avoid a potential DOS vector.
- Auth token online status calculation becomes harder as its not binary anymore
  but we have to count number of open connections. That's something we have to
  do for the limit thing anyway.

## Voting
tbd

## Specification
In the current scheme a client has to use the auth token as client identifier
to authenticate a connection to broker.

Possible multi connection schemes:
- Use auth token as username and leave password empty. Client id will be
  the auth token with a random postfix chosen by client (`[0-9a-zA-Z]*`).
- Use auth token as username and leave password empty. Client id will be
  a random identifier chosen by client (`[0-9a-zA-Z]*`). The broker will
  internally resolve the client id to something unique.
- Pass auth token as client id with an optional random postfix chosen by client
  (`[0-9a-zA-Z]*`) separated by a special character (e.g. `|`). Username and
  password are left empty. This approach may collide with a potential future
  feature where the integrator defines valid auth tokes (e.g. by webhook).
