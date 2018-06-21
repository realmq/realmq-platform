# Email Transport

## Goal
Unlock another dimension to integrate RealMQ via providing ways to
export/import messages from/into our system via email.

## Cost
tbd

## Risks
tbd

## Voting
tbd

## Specification
We differentiate between inbound and outbound email transport.

### Inbound
The service provides a TLS secured SMTP interface for email servers to connect
to.

User authentication could be done by these strategies:
- Auth token in SMTP Auth flow<br>
  This looks like the most secure way to authenticate clients. This way the
  integrator has to connect directly to our SMTP interface.
- Auth token in sender address<br>
  Accepting unauthorized connections and use `From` header to extract auth token
  (from address could look like this: `<auth-token>@realmq.com`).
  This way a integrator could use a existing email server to send his messages.
  These other servers would then connect to our interface and try to deliver
  the message. Downside of this approach is that auth tokens may be stored on
  untrusted systems and transported via unencrypted channels. At least we can
  enforce the last hop is encrypted by providing TLS only.

Target determination could be done via these strategies:
- Channel in subject<br>
  Channel Id is specified in the `Subject` header. Multiple Ids would need some
  kind of separator. This separator should not be a valid channel id character.
- Channel in receiver address<br>
  Channel Id is specified via `To` header (e.g. `<channel-id>@realmq.com`). We
  have to ensure header semantics and special chars don't collide with our
  channel id syntax / allowed characters.
- Inbound id<br>
  Instead of specifying channels directly the integrator would configure a
  email inbound entity. That would hold the id used for accepting messages,
  special configurations and list of channels to publish received messages to.

Authorization strategies:
- Implicit<br>
  This would work mostly like the broker. On sending a message a lookup against
  subscriptions is performed and when the sending user has write permissions
  the message gets delivered. Without permissions we could reject the email so
  the user gets direct feedback about a failed send. Or we silently ignore the
  message.
- Explicit<br>
  Like implicit but additionally a check for channel config is performed. If
  a channel lacks proper inbound config the message will be rejected.
- Inbound config<br>
  Config could come either from target channels or the inbound entity.

Message unwrapping strategies:
- Dump everything<br>
  Forward the whole mail including its envelope so we don't have to care about
  multipart.
- First part only<br>
  Only use the body or first part of a multi part email.
- Burst all parts<br>
  Take all body parts and send each as a different message.
- Configurable<br>
  Take channel or inbound config and decide with that how to convert multi part
  messages into a single blob
- Opinionated translation<br>
  Translate the incoming message to some opinionated data structure like a json
  object.
- Envelope it<br>
  Introducing the RMQ Envelop (with multi part support) and translate the
  multipart message to it.

### Outbound
We would provide a new feature so the integrator can configure a channel to
trigger outbound emails. For sure we need a `enabled` flag and `from` and `to`
values. But we also need to configure the outbound SMTP server. This could be
done directly in channel settings or via some kind of account or realm
configuration.

There should be a way to inform the integrator about any errors happening on
outbound mails (like outbound SMTP server unavailable).
