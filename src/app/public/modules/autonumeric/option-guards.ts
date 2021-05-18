import { SkyAutonumericOptions } from './autonumeric-options';
import AutoNumeric, {
  Options as AutoNumericOptions
} from 'autonumeric';

export function isPredefinedAutoNumericOption(option: SkyAutonumericOptions): option is string | keyof AutoNumeric.PredefinedOptions {
  const predefinedOptions = AutoNumeric.getPredefinedOptions();
  const value = predefinedOptions[option as keyof AutoNumericOptions] as AutoNumericOptions;

  return !!value;
}
