import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'form-control-viewer',
  template: `
    <div>Value: {{ control.value }}</div>
    <div>Dirty: {{ control.dirty }}</div>
    <div>Pristine: {{ control.pristine }}</div>
    <div>Touched: {{ control.touched }}</div>
    <div>Valid: {{ control.valid }}</div>
  `
})

export class FormControlViewerComponent {
  @Input() public control: FormControl;
}
