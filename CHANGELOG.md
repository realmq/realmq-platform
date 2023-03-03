# RealMQ Platform Changelog

This changelog documents all notable changes of the RealMQ Platform.
The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Changed
- Add support for upgraded verneMQ broker. This requires the acceptance of their [EULA](https://vernemq.com/end-user-license-agreement/),
  by setting the environment variable `VERNEMQ_ACCEPT_EULA` needs to be set to `yes`.

## [0.2.0] - 2023-03-09

### Added
- Introduce new administrative user management endpoints `/admin/v1/realms/{realmId}/users`.
- Introduce new administrative channel management endpoints `/admin/v1/realms/{realmId}/channels`.
- Introduce new endpoint `POST /client/v1/channels/{channelId}/messages` for sending messages.

### Changed
- Switched from account based auth for admin API to fixed API token ([#120]).

### Security
- Upgraded node to version 16 ([#114])
- Upgraded dependencies ([#116])

[#116]: https://github.com/realmq/realmq-platform/issues/116
[#114]: https://github.com/realmq/realmq-platform/issues/114
[#120]: https://github.com/realmq/realmq-platform/issues/120

## [0.1.1] - 2019-07-23
### Added
- Sending of sync messages for subscriptions
- Introduce `npm run dev` as an easy dev starting point.

### Changed
- HTTPS scheme is now configurable for smoke test suite

### Fixed
- Fixed parsing of `from` and `to` parameters on `/channel/{channelId}/messages`

### Security
- Updated dependencies (`npm audit fix`)

## [0.1.0] - 2018-06-29
### Added
- Initial platform setup

[Unreleased]: https://github.com/realmq/realmq-platform/compare/0.1.0...HEAD
[0.1.1]: https://github.com/realmq/realmq-platform/compare/0.1.0...0.1.1
[0.1.0]: https://github.com/realmq/realmq-platform/compare/42b6ca06f5cf4b1266d5f42896cf490ee30397cf...0.1.0
