import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup
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
} from '../../public';

export class MyAutonumericOptionsProvider extends SkyAutonumericOptionsProvider {
  constructor() {
    super();
  }

  public getConfig(): SkyAutonumericOptions {
    return {
      decimalPlaces: 5
    };
  }
}

@Component({
  selector: 'autonumeric-visual',
  templateUrl: './autonumeric-visual.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: SkyAutonumericOptionsProvider,
      useClass: MyAutonumericOptionsProvider
    }
  ]
})
export class AutonumericVisualComponent implements OnInit, OnDestroy {

  public autonumericOptions: SkyAutonumericOptions;

  public formGroup: FormGroup;

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      donationAmount: new FormControl(1000)
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
      donationAmount: 3756.8
    });
  }

  public clearValue(): void {
    this.formGroup.reset();
  }

  public setOptions(): void {
    this.autonumericOptions = {
      decimalPlaces: 9
    };
  }

  public setOptionsByPreset(): void {
    this.autonumericOptions = 'Chinese';
  }
}
