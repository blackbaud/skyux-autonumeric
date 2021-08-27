import {
  SkyAutonumericOptions,
  SkyAutonumericOptionsProvider
} from 'projects/sky-autonumeric/src/public-api';

export class AutonumericVisualOptionsProvider extends SkyAutonumericOptionsProvider {
  constructor() {
    super();
  }

  public getConfig(): SkyAutonumericOptions {
    return {
      decimalPlaces: 5
    };
  }
}
