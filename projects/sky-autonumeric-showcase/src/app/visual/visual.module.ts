import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SkyAutonumericModule } from 'projects/sky-autonumeric/src/public-api';
import { AutonumericVisualComponent } from './autonumeric/autonumeric-visual.component';
import { VisualComponent } from './visual.component';

@NgModule({
  declarations: [AutonumericVisualComponent, VisualComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SkyAutonumericModule,
  ],
})
export class VisualModule {}
