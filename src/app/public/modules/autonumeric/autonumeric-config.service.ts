import {
  Injectable
} from '@angular/core';

import AutoNumeric, {
  Options as AutonumericOptions
} from 'autonumeric';

import {
  Observable,
  of,
  iif,
  defer
} from 'rxjs';

import {
  map,
  take
} from 'rxjs/operators';

import {
  SkyI18nCurrencyFormat,
  SkyI18nCurrencyFormatService,
  SkyAppLocaleProvider
} from '@skyux/i18n';

import {
  SkyAutonumericOptions
} from './autonumeric-options';

import {
  SkyAutonumericOptionsProvider
} from './autonumeric-options-provider';

import {
  isPredefinedAutoNumericOption, isCurrencyFormatOption
} from './option-guards';

/**
 * Service to map a locale + iso code to an Autonumeric Config
 */
@Injectable({
  providedIn: 'root'
})
export class SkyAutonumericConfigService {

  constructor(
    private globalConfig: SkyAutonumericOptionsProvider,
    private currencyFormatService: SkyI18nCurrencyFormatService,
    private localeProvider: SkyAppLocaleProvider
  ) { }

  /**
   * Merges custom AutoNumeric options with the globally defined AutoNumeric options.
   * @param options
   */
  public getAutonumericOptions(value?: SkyAutonumericOptions): Observable<SkyAutonumericOptions> {
    const options$ = this.parseOptions(value);

    return options$.pipe(
      map(options => this.mergeWithGlobalConfig(options))
    );
  }

  private parseOptions(options?: SkyAutonumericOptions): Observable<AutonumericOptions> {
    options = options ?? {};

    if (isPredefinedAutoNumericOption(options)) {
      const predefinedOptions = AutoNumeric.getPredefinedOptions();
      return of(predefinedOptions[options as keyof AutonumericOptions] as AutonumericOptions);
    }

    if (isCurrencyFormatOption(options)) {
      return this.getCurrencyConfig(options.isoCurrencyCode, options.locale);
    }

    return of(options); // custom options
  }

  /**
   * Creates an Autonumeric Config from a Locale and Currency Code.
   * http://autonumeric.org/guide
   * @param isoCurrencyCode — the ISO 4217 Currency Code.
   * @param locale — the locale. Defaults to 'en-US'.
   */
  private getCurrencyConfig(isoCurrencyCode?: string, locale?: string): Observable<AutonumericOptions> {
    const skyLocale$ = this.localeProvider.getLocaleInfo().pipe(
      take(1),
      map(localeResp => localeResp.locale)
    );

    const locale$: Observable<string> = iif(
      () => locale === undefined,
      defer(() => skyLocale$),
      of(locale)
    );

    return locale$.pipe(
      map(newLocale => {
        const format = this.currencyFormatService.getCurrencyFormat(isoCurrencyCode, newLocale);
        return this.mapFromCurrencyFormatToAutoNumericOptions(format);
      })
    );
  }

  /**
   * Maps to Autonumeric options.
   * @param currencyFormat
   *
   * @see [skyux-autonumeric](https://github.com/blackbaud/skyux-autonumeric)
   * @see [AutoNumeric.js](http://autonumeric.org/guide)
   */
  private mapFromCurrencyFormatToAutoNumericOptions(format: SkyI18nCurrencyFormat): AutonumericOptions {
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

  private mergeWithGlobalConfig(options: SkyAutonumericOptions) {
    const globalOptions = this.globalConfig.getConfig();

    return Object.assign({}, globalOptions, options);
  }

}
