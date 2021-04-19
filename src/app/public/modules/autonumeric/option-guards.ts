import { SkyAutonumericOptions } from './autonumeric-options';
import AutoNumeric from 'autonumeric';

export function isPredefinedAutoNumericOption(option: SkyAutonumericOptions): option is string | keyof AutoNumeric.PredefinedOptions {
  return typeof option === 'string';
}

export function isCurrencyFormatOption(option: SkyAutonumericOptions): option is { isoCurrencyCode: string, locale?: string } {
  if (!isPredefinedAutoNumericOption(option)) {
    return (option as any)?.isoCurrencyCode !== undefined;
  }
  return false;
}
