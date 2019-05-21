import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  Optional,
  forwardRef,
  HostListener
} from '@angular/core';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  AbstractControl,
  ValidationErrors,
  NG_VALIDATORS
} from '@angular/forms';

import {
  SkyAutonumericConfig
} from './autonumeric-config';

const autoNumeric: any = require('autonumeric');

// tslint:disable:no-forward-ref no-use-before-declare
const SKY_AUTONUMERIC_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SkyAutonumericDirective),
  multi: true
};

const SKY_AUTONUMERIC_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => SkyAutonumericDirective),
  multi: true
};
// tslint:enable

@Directive({
  selector: '[skyAutonumeric]',
  providers: [
    SKY_AUTONUMERIC_VALUE_ACCESSOR,
    SKY_AUTONUMERIC_VALIDATOR
  ]
})
export class SkyAutonumericDirective implements OnInit, ControlValueAccessor {

  @Input()
  public set skyAutonumericLanguagePreset(value: string) {
    this.updateAutonumericPreset(value);
  }

  @Input()
  public set skyAutonumericOptions(value: any) {
    this.autonumericOptions = value;
  }

  private set autonumericOptions(value: any) {
    this._autonumericOptions = Object.assign(
      {},
      this.globalConfig && this.globalConfig.autonumericOptions,
      this.skyAutonumericOptions,
      value
    );

    this.autonumericInstance.update(this._autonumericOptions);
  }

  private get autonumericOptions(): any {
    return this._autonumericOptions || autoNumeric.getPredefinedOptions()['English'];
  }

  private get languagePreset(): string {
    return (
      this.globalConfig &&
      this.globalConfig.languagePreset
     ) || this.skyAutonumericLanguagePreset;
  }

  private set value(value: number) {
    if (this._value !== value) {
      this._value = value;

      this.onChange(value);

      // Do not mark the field as "dirty" if the field
      // has been initialized with a value.
      if (this.isFirstChange && this.control) {
        this.control.markAsPristine();
      }

      if (this.isFirstChange && this._value) {
        this.isFirstChange = false;
      }
    }
  }

  private autonumericInstance: any;
  private control: AbstractControl;
  private isFirstChange = true;

  private _value: number;
  private _autonumericOptions: any;

  constructor (
    private elementRef: ElementRef,
    @Optional() private globalConfig: SkyAutonumericConfig
  ) {
    this.autonumericInstance = new autoNumeric(this.elementRef.nativeElement);
  }

  public ngOnInit(): void {
    this.updateAutonumericPreset(this.languagePreset);
    this.autonumericInstance.update(this.autonumericOptions);
  }

  public writeValue(value: number) {
    this.value = value;
    if (value) {
      this.autonumericInstance.set(value);
    } else {
      this.autonumericInstance.clear();
    }
  }

  public validate(control: AbstractControl): ValidationErrors {
    if (!this.control) {
      this.control = control;
    }

    return;
  }

  public registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  @HostListener('blur')
  public onBlur(): void {
    this.onTouched();
  }

  @HostListener('keyup')
  public onKeyUp(): void {
    this.value = this.autonumericInstance.getNumber();
  }

  private updateAutonumericPreset(preset: string): void {
    const options = autoNumeric.getPredefinedOptions();
    this.autonumericInstance.update(options[preset]);
  }

  private onChange = (_: any) => {};
  private onTouched = () => {};
}
