import { SkyAutonumericOptions } from './autonumeric-options';
import AutoNumeric from 'autonumeric';

export function isPredefinedAutoNumericOption(option: SkyAutonumericOptions): option is string | keyof AutoNumeric.PredefinedOptions {
  return typeof option === 'string';
}
