# RealMQ Platform Changelog

This changelog documents all notable changes of the RealMQ Platform.
The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/).

## [Unreleased]

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
