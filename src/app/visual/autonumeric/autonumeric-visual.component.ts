import {
  Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
// import { SkyAutonumericConfig } from '../../public';

@Component({
  selector: 'autonumeric-visual',
  templateUrl: './autonumeric-visual.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    // {
    //   provide: SkyAutonumericConfig,
    //   useValue: new SkyAutonumericConfig('French', {
    //     decimalPlaces: 5
    //   })
    // }
  ]
})
export class AutonumericVisualComponent implements OnInit {

  public autonumericOptions: any;

  public formGroup: FormGroup;

  public languagePreset: string;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      donationAmount: new FormControl(1000)
    });

    this.formGroup.get('donationAmount').valueChanges.subscribe((value) => {
      console.log('Value changed:', value);
    });
  }

  public setValue(): void {
    this.formGroup.get('donationAmount').setValue(3756.8);
  }

  public clearValue(): void {
    this.formGroup.get('donationAmount').reset();
  }

  public setLanguagePreset(): void {
    this.languagePreset = 'Chinese';
  }

  public setOptions(): void {
    this.autonumericOptions = {
      decimalPlaces: 9
    };
  }
}
