import {
  NgModule
} from '@angular/core';

import { AutonumericWrapperModule } from './public/library.module';
import { AutonumericConfig } from './public/modules/autonumeric/autonumeric-config';

@NgModule({
  imports: [
    AutonumericWrapperModule
  ],
  exports: [
    AutonumericWrapperModule
  ],
  providers: [
    {
      provide: AutonumericConfig,
      useValue: new AutonumericConfig('dollar', {
        decimalPlaces: 5
      })
    }
  ]
})
export class AppExtrasModule { }
