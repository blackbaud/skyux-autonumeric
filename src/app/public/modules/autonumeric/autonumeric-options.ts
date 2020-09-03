import AutoNumeric, {
  Options
} from 'autonumeric';

/**
 * Specifies custom options provided directly to the underlying autonumeric library.
 * The value can be set to a `string` or `Object`.
 * - `string`: An alias representing a set of predefined options.
 *   This alias can be either a currency preset or a language preset. See:
 *   [autoNumeric predefined options](https://github.com/autoNumeric/autoNumeric#predefined-options)
 * - `Options`: A custom set of available options. See:
 *   [autoNumeric ](https://github.com/autoNumeric/autoNumeric#options)
 */
export type SkyAutonumericOptions = string | keyof AutoNumeric.PredefinedOptions | Options;
