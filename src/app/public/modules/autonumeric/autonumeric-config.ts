import {
  Injectable
} from '@angular/core';

@Injectable()
export class SkyAutonumericConfig {
  constructor(
    public languagePreset: string,
    public autonumericOptions?: any
  ) { }
}
