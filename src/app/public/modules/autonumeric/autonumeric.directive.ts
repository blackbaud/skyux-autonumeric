import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  OnDestroy
} from '@angular/core';

import {
  fromEvent, Subject
} from 'rxjs';

import {
  takeUntil
} from 'rxjs/operators';

import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';

import AutoNumeric, {
  Options
} from 'autonumeric';

import {
  SkyAutonumericOptions
} from './autonumeric-options';

import {
  SkyAutonumericOptionsProvider
} from './autonumeric-options-provider';

// tslint:disable:no-forward-ref
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
// tslint:enable:no-forward-ref

  /**
   * Wraps the [`autoNumeric` utility](https://github.com/autoNumeric/autoNumeric) to format
   * any type of number, including currency.
   */
  @Directive({
  selector: 'input[skyAutonumeric]',
  providers: [
    SKY_AUTONUMERIC_VALUE_ACCESSOR,
    SKY_AUTONUMERIC_VALIDATOR
  ]
})
export class SkyAutonumericDirective implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  /**
   * Assigns the name of a property from `SkyAutonumericOptionsProvider`.
   */
  @Input()
  public set skyAutonumeric(value: SkyAutonumericOptions) {
    this.autonumericOptions = this.mergeOptions(value);
    this.updateAutonumericInstance();
  }

  private nativeElement: HTMLInputElement;
  private autonumericInstance: AutoNumeric;
  private autonumericOptions: SkyAutonumericOptions;
  private control: AbstractControl;
  private isFirstChange = true;
  private value: number;
  private onDestroy$: Subject<void> = new Subject();

  constructor(
    elementRef: ElementRef,
    private globalConfig: SkyAutonumericOptionsProvider,
    private renderer: Renderer2,
    private changeDetector: ChangeDetectorRef
  ) {
    this.nativeElement = elementRef.nativeElement;
    this.createAutonumericInstance();
  }

  public ngOnInit(): void {
    this.updateAutonumericInstance();

    fromEvent(this.nativeElement, 'keyup')
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        const numericValue: number | undefined = this.getNumericValue();

        /* istanbul ignore else */
        if (this.value !== numericValue) {
          this.value = numericValue;
          this.onChange(numericValue);
        }

        /* istanbul ignore else */
        if (this.control && !this.control.dirty) {
          this.control.markAsDirty();
        }

        this.changeDetector.markForCheck();
      });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  /**
   * Implemented as part of ControlValueAccessor.
   */
  public setDisabledState(value: boolean): void {
    this.renderer.setProperty(this.nativeElement, 'disabled', value);
  }

  /**
   * This method is called by the forms API to write to the
   * view when programmatic changes from model to view are requested.
   */
  public writeValue(value: number): void {
    if (this.value !== value) {
      this.value = value;
      this.onChange(value);

      // Mark the control as "pristine" if it is initialized with a value.
      const initializedWithValue = this.isFirstChange && this.control && this.value !== null;
      if (initializedWithValue) {
        this.isFirstChange = false;
        this.control.markAsPristine();
      }
    }

    const isNumber: boolean = typeof value === 'number' && value !== null && value !== undefined;
    if (isNumber) {
      this.autonumericInstance.set(value);
    } else {
      this.autonumericInstance.clear();
    }
  }

  /** Method that performs synchronous validation against the provided control. */
  public validate(control: AbstractControl): ValidationErrors | null {
    const noErrors: null = null; // tslint:disable-line: no-null-keyword

    if (!this.control) {
      this.control = control;
    }

    if (control.value === null || control.value === undefined) {
      return noErrors;
    }

    if (typeof control.value !== 'number') {
      return {
        'notTypeOfNumber': { value: control.value }
      };
    }

    return noErrors;
  }

  /** Registers a callback function that is called when the control's value changes in the UI. */
  public registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  /** Registers a callback function that is called by the forms API on initialization to update the form model on blur. */
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  @HostListener('blur')
  public onBlur(): void {
    this.onTouched();
  }

  private getNumericValue(): number | undefined {
    const inputValue: string = this.getInputValue();
    const numericValue: number | undefined = (inputValue && !this.isInputValueTheCurrencySymbol(inputValue))
      ? this.autonumericInstance.getNumber()
      : undefined;

    return numericValue;
  }

  /**
   * Due to AutoNumeric's hover logic - when AutoNumeric has a currency symbol the value
   * that we get back on empty fields will be the currency symbol.
   *
   * This currency symbol logic ensures that we don't accidentally set
   * a form value when the only input was this programaticaly added currency symbol.
   * @param inputValue
   */
  private isInputValueTheCurrencySymbol(inputValue: string): boolean {
    const options: Record<string, any> = this.autonumericOptions as Record<string, any>;
    const currencySymbol: string = options?.currencySymbol ?? '';

    return currencySymbol && inputValue === currencySymbol.trim();
  }

  private getInputValue(): string {
    return this.nativeElement.value;
  }

  private createAutonumericInstance(): void {
    this.autonumericInstance = new AutoNumeric(this.nativeElement);
  }

  private updateAutonumericInstance(): void {
    this.autonumericInstance.update(this.autonumericOptions as Options);
  }

  private mergeOptions(value: SkyAutonumericOptions): SkyAutonumericOptions {
    const globalOptions = this.globalConfig.getConfig();

    let newOptions: SkyAutonumericOptions = {};
    if (typeof value === 'string') {
      const predefinedOptions = AutoNumeric.getPredefinedOptions();
      newOptions = predefinedOptions[value as keyof Options] as Options;
    } else {
      newOptions = value;
    }

    return Object.assign(
      {},
      globalOptions,
      newOptions
    );
  }

  /** Function to call when the value changes. */
  /* istanbul ignore next */
  private onChange = (_: number) => { };

  /** Function to call when the input is touched. */
  /* istanbul ignore next */
  private onTouched = () => { };
}
