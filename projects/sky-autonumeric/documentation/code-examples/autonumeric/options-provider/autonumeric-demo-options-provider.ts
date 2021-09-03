import {
  SkyAutonumericOptions
} from '../../../../src/modules/autonumeric/autonumeric-options';

import {
  SkyAutonumericOptionsProvider
} from '../../../../src/modules/autonumeric/autonumeric-options-provider';

export class AutonumericDemoOptionsProvider extends SkyAutonumericOptionsProvider {

  constructor() {
    super();
  }

  public getConfig(): SkyAutonumericOptions {
    return {
      currencySymbol: ' €',
      currencySymbolPlacement: 's',
      decimalPlaces: 2,
      decimalCharacter: ',',
      digitGroupSeparator: ''
    };
  }
}
