/**
 * Applies preconfigured options onto AutonumericJS
 */
export interface SkyAutonumericDefaults {
  /**
   * Applies a "Currency" configuration given a iso currency code and locale.
   */
  currency?: {
    /**
     * The ISO 4217 currency code.
     * @example 'USD', 'CAD', 'EUR', 'JPY', 'GBP, 'AUD'
     */
    isoCurrencyCode?: string;

    /**
     * The locale.
     * @example 'en-US', 'en-GB', 'fr-FR'
     */
    locale?: string;
  };
}
