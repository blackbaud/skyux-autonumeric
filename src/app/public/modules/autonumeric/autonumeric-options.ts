import AutoNumeric, {
  Options as AutonumericOptions
} from 'autonumeric';

/**
 * Specifies custom options to provide directly to the underlying [`autoNumeric` utility](https://github.com/autoNumeric/autoNumeric).
 * The value can be set to `string`, which is an alias that represents
 * a [set of predefined set of options](https://github.com/autoNumeric/autoNumeric#predefined-options)
 * for a currency preset or a language preset, or `Options`, which is a
 * [custom set of options](https://github.com/autoNumeric/autoNumeric#options)
 * that override any default options that the `skyAutonumeric` attribute specifies.
 */
export type SkyAutonumericOptions = PredefinedAutonumericOption | AutonumericOptions | CurrencyAndLocale;

type PredefinedAutonumericOption = string | keyof AutoNumeric.PredefinedOptions;
type CurrencyAndLocale = { isoCurrencyCode: string, locale?: string };
