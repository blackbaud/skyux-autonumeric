import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  Subject
} from 'rxjs';

import {
  takeUntil
} from 'rxjs/operators';

import {
  SkyAutonumericOptions,
  SkyAutonumericOptionsProvider
} from 'projects/sky-autonumeric/src/public-api';

import {
  AutonumericVisualOptionsProvider
} from './autonumeric-visual-options-provider';

@Component({
  selector: 'app-autonumeric-visual',
  templateUrl: './autonumeric-visual.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: SkyAutonumericOptionsProvider,
      useClass: AutonumericVisualOptionsProvider
    }
  ]
})
export class AutonumericVisualComponent implements OnInit, OnDestroy {

  public autonumericOptions: SkyAutonumericOptions;

  public disabled: boolean = false;

  public formGroup: FormGroup;

  public templateDrivenModel: any = {
    donationAmount: 1000
  };

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      currency: new FormControl(undefined, [Validators.required]),
      donationAmount: new FormControl(1000, [Validators.required])
    });

    this.formGroup.get('donationAmount').valueChanges
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((value) => {
        console.log('Value changed:', value);
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public setValue(): void {
    this.formGroup.setValue({
      donationAmount: 3756.8,
      currency: 18.99
    });
    this.templateDrivenModel.donationAmount = 3756.8;
  }

  public clearValue(): void {
    this.formGroup.reset();
    this.templateDrivenModel.donationAmount = undefined;
  }

  public setOptions(): void {
    this.autonumericOptions = {
      decimalPlaces: 9
    };
  }

  public setOptionsByPreset(): void {
    this.autonumericOptions = 'Chinese';
  }

  public setOptionsToCustom(): void {
    this.autonumericOptions = {
      currencySymbol: '#',
      currencySymbolPlacement: 's',
      decimalPlaces: 3
    };
  }

  public onDisableClick(): void {
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.formGroup.get('donationAmount').disable();
    } else {
      this.formGroup.get('donationAmount').enable();
    }
  }
}
