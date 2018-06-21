# Outbound Webhooks

## Goal
Increase overall product attractiveness by improving integratability.

## Cost
**Development and documentation costs:**
* **A** Implement webhook management endpoints
* **A** Extend C(r)UD tasks to trigger webhook call
* **A** Implement webhook emitter
* **A** Write webhook documentation
* **B** Tools for managing webhooks (management sdk, cli tool, website)
* **B** Implement webhook logging and failure management.

**TODO**: Estimation

## Risks
**Technical:**
* **B** Webhooks cause much traffic.

## Voting
Shall we implement the specified feature?

| Name | YES | NO |
|------|-----|----|
| Alrik | | |
| Henning | | |
| Lars | | |

## Specification

### Scope
Outbound webhooks are HTTP POST requests to external systems upon
`CREATE`, `UPDATE` and `DELETE` events on the following resources:
* Auth Tokens (`CUD`)
* Channels (`CUD`)
* Messages (`C`)
* Subscriptions (`CUD`)
* Users (`CUD`)

### Webhook Management

* Webhooks can be managed in account scope via api `/admin/v1/realms/:realmId/webhooks`.
* Accounts need access on the given realm, otherwise `404 - UnknownRealm` response.
* One webhook url can be registered for multiple events.
* The url and event list can be altered via `PATCH` update requests.

#### Webhook Resource

```yaml
Webhook:
  - id (String)
  - realmId (String)
  - events (String[])
  - url (String)
  - createdAt (Date)
  - updatedAt (Date)
```

### Events
For receiving webhooks, accounts can register callback urls on the
following realm events:

* auth-created
* auth-deleted
* auth-updated
* channel-created
* channel-deleted
* channel-updated
* message-persisted
* subscription-created
* subscription-deleted
* subscription-updated
* user-created
* user-deleted
* user-updated

### Webhook flow

1. Internal state change (eg.
