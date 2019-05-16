import { NgModule } from '@angular/core';
import { AutonumericWrapperModule } from './modules/autonumeric';

export * from './modules/autonumeric';

@NgModule({
  exports: [
    AutonumericWrapperModule
  ]
})
export class AutonumericLibraryModule {

}
