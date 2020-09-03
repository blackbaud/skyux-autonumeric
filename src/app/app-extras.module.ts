import {
  NgModule
} from '@angular/core';

import {
  SkyAppLinkModule
} from '@skyux/router';

import {
  SkyDocsToolsModule,
  SkyDocsToolsOptions
} from '@skyux/docs-tools';

import {
  SkyAutonumericModule
} from './public/public_api';

@NgModule({
  exports: [
    SkyAppLinkModule,
    SkyAutonumericModule,
    SkyDocsToolsModule
  ],
  providers: [
    {
      provide: SkyDocsToolsOptions,
      useValue: {
        gitRepoUrl: 'https://github.com/blackbaud/skyux-autonumeric',
        packageName: '@skyux/core'
      }
    }
  ]
})
export class AppExtrasModule { }
