/**
 * Applies preconfigured options onto AutonumericJS
 */
export interface SkyAutonumericDefaults {
  /**
   * Applies a "Currency" configuration given a iso currency code and locale.
   */
  currency: {
    /**
     * The ISO 4217 currency code.
     */
    isoCurrencyCode: string;

    /**
     * The locale.
     * @default 'en-US'
     * @example 'en-US', 'en-GB', 'fr-FR'
     */
    locale: string;
  };
}
