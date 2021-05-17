import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
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
} from '../../public/public_api';

import {
  AutonumericVisualOptionsProvider
} from './autonumeric-visual-options-provider';

import {
  SkyAutonumericDefaults
} from '../../public/modules/autonumeric/autonumeric-defaults';

@Component({
  selector: 'autonumeric-visual',
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
  public templateDrivenModel: any;

  public currencyForm: FormGroup;
  public currencyDefault: SkyAutonumericDefaults = {
    currency: { isoCurrencyCode: 'USD', locale: 'en-US' }
  };

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      donationAmount: [1000, Validators.required]
    });
    this.templateDrivenModel = {
      donationAmount: 1000
    };

    this.currencyForm = this.formBuilder.group({
      currency: [125.34, Validators.required]
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
    this.formGroup.setValue({ donationAmount: 3756.8 });
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

  public setCurrencyLocale(locale: string): void {
    const currency = {
      ...this.currencyDefault,
      locale: locale
    };

    this.currencyDefault = { currency };
  }

  public setCurrency(currencyCode: string): void {
    const currency = {
      ...this.currencyDefault,
      isoCurrencyCode: currencyCode
    };

    this.currencyDefault = { currency };
  }
}
