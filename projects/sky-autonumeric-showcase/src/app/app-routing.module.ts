import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutonumericVisualComponent } from './visual/autonumeric/autonumeric-visual.component';
import { VisualComponent } from './visual/visual.component';

const routes: Routes = [
  {
    path: '',
    component: VisualComponent
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
