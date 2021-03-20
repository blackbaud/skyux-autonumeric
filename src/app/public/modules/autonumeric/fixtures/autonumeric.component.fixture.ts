import {
  ChangeDetectionStrategy,
  Component,
  ViewChild
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
  @ViewChild(SkyAutonumericDirective)
  public autonumericDirective: SkyAutonumericDirective;

  @ViewChild('donationAmountTemplateDriven', { read: NgModel })
  public donationAmountTemplateDriven: NgModel;

  public autonumericOptions: SkyAutonumericOptions;
  public useDefaultDebounce: boolean = true;
  public customDebounceTime: number = 250;
  public required: boolean;

  public formGroup: FormGroup = this.formBuilder.group({
    donationAmount: new FormControl()
  });
  public templateDrivenModel: any = {
    donationAmount: 1000
  };

  public get formControl(): AbstractControl {
    return this.formGroup.get('donationAmount');
  }

  constructor(
    private formBuilder: FormBuilder
  ) { }
}
