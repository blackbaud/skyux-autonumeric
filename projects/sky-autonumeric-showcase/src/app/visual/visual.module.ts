import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SkyAutonumericModule } from 'projects/sky-autonumeric/src/public-api';
import { AutonumericVisualComponent } from './autonumeric/autonumeric-visual.component';

@NgModule({
  declarations: [
    AutonumericVisualComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SkyAutonumericModule
  ]
})
export class VisualModule { }
