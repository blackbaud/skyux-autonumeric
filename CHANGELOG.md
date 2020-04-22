# 3.0.5 (2020-04-22)

- Fixed the `skyAutonumeric` directive to validate on input changes. [#22](https://github.com/blackbaud/skyux-autonumeric/pull/22)

# 3.0.4 (2020-04-07)

- Fixed the `skyAutonumeric` directive to no longer treat empty values as zero when using a currency symbol. [#18](https://github.com/blackbaud/skyux-autonumeric/pull/18)

# 3.0.3 (2020-01-31)

- Fixed the `skyAutonumeric` directive to properly set the invalid state when the input is required. [#15](https://github.com/blackbaud/skyux-autonumeric/pull/15)
- Fixed the `skyAutonumeric` directive to no longer treat empty values as zero. [#15](https://github.com/blackbaud/skyux-autonumeric/pull/15)
- Fixed the `skyAutonumeric` directive to show an invalid state when values are provided that are not of type `number`. [#15](https://github.com/blackbaud/skyux-autonumeric/pull/15)

# 3.0.2 (2020-01-31)

- Fixed the `skyAutonumeric` directive to properly set the disabled state when using reactive forms. [#9](https://github.com/blackbaud/skyux-autonumeric/pull/9)

# 3.0.1 (2019-08-01)

- Fixed the `skyAutonumeric` directive to properly format a zero (0) value. [#5](https://github.com/blackbaud/skyux-autonumeric/pull/5) (Thanks [@Blackbaud-StewartStephens](https://github.com/Blackbaud-StewartStephens)!)

# 3.0.0 (2019-05-22)

- Initial major release.

# 3.0.0-beta.2 (2019-05-22)

- Added support for template-driven forms. [#4](https://github.com/blackbaud/skyux-autonumeric/pull/4)

# 3.0.0-beta.1 (2019-05-22)

- Fixed the `skyAutonumeric` directive to work with reactive forms. [#3](https://github.com/blackbaud/skyux-autonumeric/pull/3)

### Breaking changes
- Removed the `skyAutonumericOptions` and `skyAutonumericPreset` inputs on the `skyAutonumeric` directive. `AutoNumeric` options can now be set directly using the `skyAutonumeric` attribute (e.g., `[skyAutonumeric]="options"`).
- Replaced the `SkyAutonumericConfig` with `SkyAutonumericOptionsProvider`. See README.md for details.

# 3.0.0-beta.0 (2019-05-21)

- Initial beta release.
