import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {
  SkyI18nModule
} from '@skyux/i18n';

import {
  SkyAutonumericDirective
} from './autonumeric.directive';

import {
  SkyAutonumericOptionsProvider
} from './autonumeric-options-provider';

@NgModule({
  declarations: [
    SkyAutonumericDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SkyI18nModule
  ],
  exports: [
    SkyAutonumericDirective
  ],
  providers: [
    SkyAutonumericOptionsProvider
  ]
})
export class SkyAutonumericModule { }
