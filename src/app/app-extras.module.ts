import {
  NgModule
} from '@angular/core';

import { AutonumericModule } from './public/library.module';
import { AutonumericConfig } from './public/modules/autonumeric/autonumeric-config';

@NgModule({
  imports: [
    AutonumericModule
  ],
  exports: [
    AutonumericModule
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
