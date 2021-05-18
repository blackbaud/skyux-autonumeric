import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'debug-form-control-state',
  template: `
    <div style="border: 2px solid red; padding: 10px;">
      <div>Value: {{ control.value }}</div>
      <ng-container>
        <div>Dirty: {{ control.dirty }}</div>
        <div>Pristine: {{ control.pristine }}</div>
        <div>Touched: {{ control.touched }}</div>
        <div>Valid: {{ control.valid }}</div>
        <div>Errors: {{ control.errors | json }}</div>
      </ng-container>
    </div>
  `
})
export class DebugFormControlStateComponent {
  @Input() public control: AbstractControl;
}
