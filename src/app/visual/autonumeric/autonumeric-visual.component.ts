import {
  Component, OnInit
} from '@angular/core';

import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'autonumeric-visual',
  templateUrl: './autonumeric-visual.component.html'
})
export class AutonumericVisualComponent implements OnInit {

  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      donationAmount: new FormControl(1000)
    });

    this.formGroup.get('donationAmount').valueChanges.subscribe((value) => {
      console.log('Value?', value);
    });
  }

  public setValue(): void {
    this.formGroup.get('donationAmount').setValue(3756.8);
  }

  public clearValue(): void {
    this.formGroup.get('donationAmount').reset();
  }
}
