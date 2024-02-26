# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## v4.1.0 (2024-02-26)

#### :rocket: Enhancement

- [#840](https://github.com/adopted-ember-addons/ember-popper-modifier/pull/840) Migrate to TypeScript and publish Glint types ([@jelhan](https://github.com/jelhan))

#### :house: Internal

- [#596](https://github.com/adopted-ember-addons/ember-popper-modifier/pull/596) test embroider compatibility in CI ([@jelhan](https://github.com/jelhan))
- [#838](https://github.com/adopted-ember-addons/ember-popper-modifier/pull/838) migrate to PNPM ([@jelhan](https://github.com/jelhan))

#### Committers: 1

- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))

## v4.0.0 (2023-11-05)

#### :boom: Breaking Change

- [#772](https://github.com/adopted-ember-addons/ember-popper-modifier/pull/772) Drop support for Ember < 4.8 ([@jelhan](https://github.com/jelhan))
- [#771](https://github.com/adopted-ember-addons/ember-popper-modifier/pull/771) drop support for node 14 and 16 ([@jelhan](https://github.com/jelhan))
- [#774](https://github.com/adopted-ember-addons/ember-popper-modifier/pull/774) drop support for ember-modifier v3 ([@jelhan](https://github.com/jelhan))
- [#775](https://github.com/adopted-ember-addons/ember-popper-modifier/pull/775) drop support for Ember classic optional feature flags ([@jelhan](https://github.com/jelhan))

#### :rocket: Enhancement

- [#770](https://github.com/adopted-ember-addons/ember-popper-modifier/pull/770) Support Ember v5 ([@timmorey](https://github.com/timmorey))

#### :house: Internal

- [#777](https://github.com/adopted-ember-addons/ember-popper-modifier/pull/777) upgrade with Ember CLI v5.4 blueprints ([@jelhan](https://github.com/jelhan))
- [#610](https://github.com/adopted-ember-addons/ember-popper-modifier/pull/610) Add '@ember/string' dev dependency to avoid deprecation warning ([@pzubar](https://github.com/pzubar))

#### Committers: 3

- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- Petro Zubar ([@pzubar](https://github.com/pzubar))
- Timothy Morey ([@timmorey](https://github.com/timmorey))

## v3.0.0 (2023-01-17)

#### :boom: Breaking Change

- [#577](https://github.com/adopted-ember-addons/ember-popper-modifier/pull/577) drop support for node < 14 and other node versions, which reached EOL ([@jelhan](https://github.com/jelhan))
- [#578](https://github.com/adopted-ember-addons/ember-popper-modifier/pull/578) drop support for Ember < 3.28 ([@jelhan](https://github.com/jelhan))

#### :rocket: Enhancement

- [#594](https://github.com/adopted-ember-addons/ember-popper-modifier/pull/594) support ember-modifier v4 ([@jelhan](https://github.com/jelhan))
- [#508](https://github.com/adopted-ember-addons/ember-popper-modifier/pull/508) Refactor to use ember-modifier's modify hook and fix deprecation ([@st-h](https://github.com/st-h))

#### :house: Internal

- [#595](https://github.com/adopted-ember-addons/ember-popper-modifier/pull/595) add basic example in dummy app for manual testing ([@jelhan](https://github.com/jelhan))
- [#592](https://github.com/adopted-ember-addons/ember-popper-modifier/pull/592) upgrade boilerplate files with Ember CLI 4.9 blueprints ([@jelhan](https://github.com/jelhan))
- [#587](https://github.com/adopted-ember-addons/ember-popper-modifier/pull/587) use standard Prettier configuration in Ember ecosystem ([@jelhan](https://github.com/jelhan))
- [#586](https://github.com/adopted-ember-addons/ember-popper-modifier/pull/586) upgrade boilerplate files with blueprints from Ember CLI 3.28 ([@jelhan](https://github.com/jelhan))
- [#581](https://github.com/adopted-ember-addons/ember-popper-modifier/pull/581) Support releases and changelog generation using release-it ([@jelhan](https://github.com/jelhan))

#### Committers: 2

- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- Steve ([@st-h](https://github.com/st-h))

## [2.0.1](https://github.com/alexlafroscia/ember-popper-modifier/compare/v2.0.0...v2.0.1) (2022-02-05)

## [2.0.0](https://github.com/alexlafroscia/ember-popper-modifier/compare/v1.0.1...v2.0.0) (2022-02-02)

BREAKING CHANGE: `ember-modifier` no longer supports Ember versions lower than 3.24, so `ember-popper-modifier` does not either.

## [1.0.1](https://github.com/alexlafroscia/ember-popper-modifier/compare/v1.0.0...v1.0.1) (2021-06-01)

## [1.0.0](https://github.com/alexlafroscia/ember-popper-modifier/compare/v1.0.0-5...v1.0.0) (2021-02-17)

## [1.0.0-5](https://github.com/alexlafroscia/ember-popper-modifier/compare/v1.0.0-4...v1.0.0-5) (2020-08-07)

## [1.0.0-4](https://github.com/alexlafroscia/ember-popper-modifier/compare/v1.0.0-3...v1.0.0-4) (2020-08-05)

### Features

- support modifiers as positional params ([7ab4a99](https://github.com/alexlafroscia/ember-popper-modifier/commit/7ab4a99d53b54aea7dd5d7e20f619c46af8f729a)), closes [#13](https://github.com/alexlafroscia/ember-popper-modifier/issues/13)

## [1.0.0-3](https://github.com/alexlafroscia/ember-popper-modifier/compare/v1.0.0-2...v1.0.0-3) (2020-08-05)

### Features

- add modifiers for Ember runloop integration ([0cd6c45](https://github.com/alexlafroscia/ember-popper-modifier/commit/0cd6c45a473a5c3339eba441a50848040884d7cf))

## [1.0.0-2](https://github.com/alexlafroscia/ember-popper-modifier/compare/v1.0.0-1...v1.0.0-2) (2020-06-23)

### Bug Fixes

- destroy popper with modifier ([37a637c](https://github.com/alexlafroscia/ember-popper-modifier/commit/37a637cca5e5e0a94db8dc2d7c1c97eaeaf4fe58))

## [1.0.0-1](https://github.com/alexlafroscia/ember-popper-modifier/compare/v1.0.0-0...v1.0.0-1) (2020-06-22)

### Features

- add utility for finding popper instance for element ([de01f8e](https://github.com/alexlafroscia/ember-popper-modifier/commit/de01f8e474e8b093ec906c45be0f41f51265c22a))
- allow passing config options as positional param ([141c204](https://github.com/alexlafroscia/ember-popper-modifier/commit/141c2040701a976faa1c3bce87c6fc90a5b2619d))

## 1.0.0-0 (2020-06-22)

### Features

- add modifier for attaching popper from tooltip element ([c7054a4](https://github.com/alexlafroscia/ember-popper-modifier/commit/c7054a4c1c849d9ac3bae9e248e96397b7eb077c))
- add support for Popper modifiers ([b0bee6f](https://github.com/alexlafroscia/ember-popper-modifier/commit/b0bee6f0162ca5133d3b129eaf2bdca2aa746fff))
- create basic `popper` modifier ([318cd63](https://github.com/alexlafroscia/ember-popper-modifier/commit/318cd63b1b619012f17b6cd86b29fdcc872c9a8f))
