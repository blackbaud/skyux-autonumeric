import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutonumericVisualComponent } from './visual/autonumeric/autonumeric-visual.component';
import { VisualsComponent } from './visual/visuals.component';

const routes: Routes = [
  {
    path: '',
    component: VisualsComponent
  },
  {
    path: 'visual/autonumeric',
    component: AutonumericVisualComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
