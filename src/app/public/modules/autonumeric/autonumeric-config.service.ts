import {
  Injectable
} from '@angular/core';

import AutoNumeric, {
  Options as AutonumericOptions
} from 'autonumeric';

import {
  SkyI18nCurrencyFormatService
} from '@skyux/i18n';

import {
  SkyAutonumericOptions
} from './autonumeric-options';

import {
  SkyAutonumericOptionsProvider
} from './autonumeric-options-provider';

import {
  isPredefinedAutoNumericOption
} from './option-guards';

import {
  SkyAutonumericDefaults
} from './autonumeric-defaults';

/**
 * Helper service to create autonumeric options.
 * @internal
 */
@Injectable({
  providedIn: 'root'
})
export class SkyAutonumericConfigService {

  constructor(
    private globalConfig: SkyAutonumericOptionsProvider,
    private currencyFormatService: SkyI18nCurrencyFormatService
  ) { }

  /**
   * Creates an AutoNumeric Config by merging the custom options and the globally defined AutoNumeric options.
   * @param options
   */
  public getAutonumericOptions(value?: SkyAutonumericOptions): AutonumericOptions {
    const options: AutonumericOptions = this.parseOptions(value);

    return this.mergeWithGlobalConfig(options);
  }

  /**
   * Given a Sky Autonumeric Default it will return default options
   * @param defaults
   */
  public getSkyAutonumericDefaults(defaults: SkyAutonumericDefaults): AutonumericOptions {
    if (defaults.currency) {
      return this.getCurrencyConfig(defaults.currency);
    }

    return {};
  }

  private parseOptions(options: SkyAutonumericOptions = {}): AutonumericOptions {
    if (isPredefinedAutoNumericOption(options)) {
      const predefinedOptions = AutoNumeric.getPredefinedOptions();
      const option = predefinedOptions[options as keyof AutonumericOptions] as AutonumericOptions;

      return option;
    }

    return options;
  }

  /**
   * Creates an Autonumeric Config from a Locale and Currency Code.
   * @param isoCurrencyCode the ISO 4217 Currency Code.
   * @param locale the locale. Defaults to 'en-US'.
   */
  private getCurrencyConfig(currency: { isoCurrencyCode?: string, locale?: string }): AutonumericOptions {
    const { isoCurrencyCode = 'USD', locale = 'en-US' } = currency;

    const format = this.currencyFormatService.getCurrencyFormat(isoCurrencyCode, locale);
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

  private mergeWithGlobalConfig(options: SkyAutonumericOptions): AutonumericOptions {
    const globalConfig: SkyAutonumericOptions = this.globalConfig.getConfig();
    const parseGlobalOptions: AutonumericOptions = this.parseOptions(globalConfig);

    return Object.assign({}, parseGlobalOptions, options);
  }

}
