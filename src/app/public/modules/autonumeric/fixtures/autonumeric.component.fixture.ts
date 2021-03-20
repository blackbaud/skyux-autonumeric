import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  Input
} from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  NgModel
} from '@angular/forms';

import {
  SkyAutonumericDirective
} from '../autonumeric.directive';

import {
  SkyAutonumericOptions
} from '../autonumeric-options';

@Component({
  selector: 'autonumeric-directive-test',
  templateUrl: './autonumeric.component.fixture.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutonumericFixtureComponent {

  @Input() public debounceTime: number = 250;

  @ViewChild(SkyAutonumericDirective)
  public autonumericDirective: SkyAutonumericDirective;

  @ViewChild('donationAmountTemplateDriven', { read: NgModel })
  public donationAmountTemplateDriven: NgModel;

  public autonumericOptions: SkyAutonumericOptions;

  public formGroup: FormGroup = this.formBuilder.group({
    donationAmount: new FormControl(),
    donationAmountWithDebounce: new FormControl()
  });

  public templateDrivenModel: any = {
    donationAmount: 1000
  };

  public get formControl(): AbstractControl {
    return this.formGroup.get('donationAmount');
  }

  public get formControlWithDebounce(): AbstractControl {
    return this.formGroup.get('donationAmountWithDebounce');
  }

  public required: boolean;

  constructor(
    private formBuilder: FormBuilder
  ) { }
}
