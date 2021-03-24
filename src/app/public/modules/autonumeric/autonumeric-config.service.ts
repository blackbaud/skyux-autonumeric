import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Options as AutonumericOptions } from 'autonumeric';
import { SkyCurrencyFormat, SkyI18nSkyCurrencyFormatService } from './MOCK-currency-format.service';

type IsoCodeAndLocale = { isoCode: string; locale: string };

/**
 * Service to get a currency's format given an iso code.
 */
@Injectable({
  providedIn: 'root'
})
export class AutonumericConfigService {
  constructor(private currencyFormatService: SkyI18nSkyCurrencyFormatService) { }

  /**
   * Creates an Autonumeric Config from a Locale and Currency Code.
   * http://autonumeric.org/guide
   * @param params optional params object
   * @param params.isoCode the ISO 4217 Code. Defaults to `USD`.
   * @param params.locale the Locale. Defaults to `SkyAppLocaleProvider.getLocaleInfo`.
   */
  public getAutonumericConfig(params?: Partial<IsoCodeAndLocale>): AutonumericOptions {
    const format = this.currencyFormatService.getCurrencyFormat(params);
    return this.mapFromFormatToAutonumericOptions(format);
  }

  /**
   * Creates an Observable of Autonumeric Config from a Locale and Currency Code.
   * http://autonumeric.org/guide
   * @param params optional params object
   * @param params.isoCode the ISO 4217 Code. Defaults to `USD`.
   * @param params.locale the Locale. Defaults to `SkyAppLocaleProvider.getLocaleInfo`
   */
  public getAutonumericConfigAsync(params?: Partial<IsoCodeAndLocale>): Observable<AutonumericOptions> {
    return this.currencyFormatService.getCurrencyFormatAsync(params).pipe(
      map(config => this.mapFromFormatToAutonumericOptions(config))
    );
  }

  /**
   * Maps to Autonumeric options.
   * @param currencyFormat
   *
   * @see [skyux-autonumeric](https://github.com/blackbaud/skyux-autonumeric)
   * @see [AutoNumeric.js](http://autonumeric.org/guide)
   */
  private mapFromFormatToAutonumericOptions(format: SkyCurrencyFormat) {
    const options: AutonumericOptions = {
      currencySymbol: format.symbol,
      currencySymbolPlacement: format.symbolLocation,
      decimalCharacter: format.decimalCharacter,
      decimalPlaces: format.precision,
      digitGroupSeparator: format.groupCharacter
    };

    // Autonumeric does not support the same character being used for decimal and group separators so override.
    if (options.decimalCharacter === options.digitGroupSeparator) {
      options.decimalCharacter = '.';
      options.digitGroupSeparator = ',';
    }

    return options;
  }

}
