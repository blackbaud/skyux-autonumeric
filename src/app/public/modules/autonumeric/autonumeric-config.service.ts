import {
  Injectable
} from '@angular/core';

import {
  Options as AutonumericOptions
} from 'autonumeric';

import {
  SkyI18nCurrencyFormat,
  SkyI18nCurrencyFormatService
} from '@skyux/i18n';

/**
 * Service to map a locale + iso code to an Autonumeric Config
 */
@Injectable({
  providedIn: 'root'
})
export class SkyAutonumericConfigService {
  constructor(private currencyFormatService: SkyI18nCurrencyFormatService) { }

  /**
   * Creates an Autonumeric Config from a Locale and Currency Code.
   * http://autonumeric.org/guide
   * @param isoCurrencyCode — the ISO 4217 Currency Code. Defaults to 'USD'.
   * @param locale — the locale. Defaults to 'en-US'. Examples: 'en-US', 'en-GB', 'fr-FR'.
   */
  public getAutonumericConfig(isoCurrencyCode?: string, locale?: string): AutonumericOptions {
    const format = this.currencyFormatService.getCurrencyFormat(isoCurrencyCode, locale);
    return this.mapFromFormatToAutonumericOptions(format);
  }

  /**
   * Maps to Autonumeric options.
   * @param currencyFormat
   *
   * @see [skyux-autonumeric](https://github.com/blackbaud/skyux-autonumeric)
   * @see [AutoNumeric.js](http://autonumeric.org/guide)
   */
  private mapFromFormatToAutonumericOptions(format: SkyI18nCurrencyFormat): AutonumericOptions {
    const options: AutonumericOptions = {
      currencySymbol: format.symbol,
      currencySymbolPlacement: format.symbolLocation === 'suffix' ? 's' : 'p',
      decimalCharacter: format.decimalCharacter,
      decimalPlaces: format.precision,
      digitGroupSeparator: format.groupCharacter
    };

    // Autonumeric does not support the same character being used for decimal and group separators.
    if (options.decimalCharacter === options.digitGroupSeparator) {
      options.decimalCharacter = '.';
      options.digitGroupSeparator = ',';
    }

    return options;
  }

}
