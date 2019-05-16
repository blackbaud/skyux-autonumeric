import { NgModule } from '@angular/core';
import { AutonumericModule } from './modules/autonumeric';

export * from './modules/autonumeric';

@NgModule({
  exports: [
    AutonumericModule
  ]
})
export class AutonumericLibraryModule {

}
