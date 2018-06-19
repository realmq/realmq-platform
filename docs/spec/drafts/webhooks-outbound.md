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

### Events
For receiving webhooks, accounts can register callback urls on the
following events:

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
