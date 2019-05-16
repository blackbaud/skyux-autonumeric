import { NgModule } from '@angular/core';
import { AutonumericWrapperDirective } from './autonumeric.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AutonumericWrapperDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AutonumericWrapperDirective
  ]
})
export class AutonumericWrapperModule { }
