import {
  Injectable
} from '@angular/core';

import {
  SkyAutonumericOptions
} from './autonumeric-options';

/**
 * Provides options to the underlying [autoNumeric library](https://github.com/autoNumeric/autoNumeric).
 */
@Injectable()
export class SkyAutonumericOptionsProvider {

  /**
   * Specifies a value that represents a settings object to pass to the autoNumeric jQuery plugin.
   * These options override any default options specified in the `skyAutonumeric` attribute.
   * For more information, see the [complete list of options](http://www.decorplanit.com/plugin/).
   */
  public getConfig(): SkyAutonumericOptions {
    return {};
  }

}
