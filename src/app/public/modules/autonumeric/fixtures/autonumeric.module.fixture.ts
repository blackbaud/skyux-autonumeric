import {
  NgModule
} from '@angular/core';

import {
  SkyAutonumericModule
} from '../autonumeric.module';

import {
  AutonumericFixtureComponent
} from './autonumeric.component.fixture';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SkyAutonumericModule
  ],
  declarations: [
    AutonumericFixtureComponent
  ],
  exports: [
    AutonumericFixtureComponent
  ]
})
export class AutonumericFixtureModule { }
