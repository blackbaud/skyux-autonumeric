import { NgModule } from '@angular/core';
import { AutonumericDirective } from './autonumeric.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AutonumericDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AutonumericDirective
  ]
})
export class AutonumericModule { }
