import {
  NgModule
} from '@angular/core';

import {
  SkyAppLinkModule
} from '@skyux/router';

import {
  // SkyAutonumericConfig,
  SkyAutonumericModule
} from './public';

@NgModule({
  exports: [
    SkyAppLinkModule,
    SkyAutonumericModule
  ],
  providers: [
    // {
    //   provide: SkyAutonumericConfig,
    //   useValue: new SkyAutonumericConfig('French', {
    //     decimalPlaces: 5
    //   })
    // }
  ]
})
export class AppExtrasModule { }
