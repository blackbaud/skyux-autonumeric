import { NgModule } from '@angular/core';
import { SkyAutonumericDirective } from './autonumeric.directive';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SkyAutonumericDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SkyAutonumericDirective
  ]
})
export class SkyAutonumericModule { }
