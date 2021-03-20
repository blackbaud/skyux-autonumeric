import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Renderer2
} from '@angular/core';

import {
  fromEvent, Subject
} from 'rxjs';

import {
  debounceTime, takeUntil
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

  /**
   * Specifies how many milliseconds to wait before searching after users enter text in the search input.
   * @default 250
   */
  @Input() public skyAutonumericDebounceTime: number = 250;

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
      .pipe(
        takeUntil(this.onDestroy$),
        debounceTime(this.skyAutonumericDebounceTime)
      )
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

  public setDisabledState(value: boolean): void {
    this.renderer.setProperty(this.nativeElement, 'disabled', value);
  }

  public writeValue(value: number): void {
    if (this.value !== value) {
      this.value = value;
      this.onChange(value);

      const initializedWithValue = this.isFirstChange && this.control && this.value !== null;
      if (initializedWithValue) {
        this.isFirstChange = false;
        this.control.markAsPristine();
      }
    }

    const isNumber = typeof value === 'number' && value !== null && value !== undefined;
    if (isNumber) {
      this.autonumericInstance.set(value);
    } else {
      this.autonumericInstance.clear();
    }
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    // tslint:disable-next-line: no-null-keyword
    const noErrors: null = null;

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

  public registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  @HostListener('blur')
  public onBlur(): void {
    this.onTouched();
  }

  /**
   * Due to autocomplete's hover logic - when autocomplete has a currency symbol the value that we will get back on empty fields
   * will be the currency symbol. The currency sybol logic here ensures that we don't accidentally set
   * a form value when the only input was this programaticaly added currency symbol.
   */
  private getNumericValue(): number | undefined {
    const inputValue = this.getInputValue();
    const currencySymbol = (this.autonumericOptions as Record<string, any>)['currencySymbol'];
    const numericValue = (inputValue && (!currencySymbol || inputValue !== currencySymbol.trim()))
      ? this.autonumericInstance.getNumber()
      : undefined;

      return numericValue;
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

  /* istanbul ignore next */
  private onChange = (_: number) => { };
  /* istanbul ignore next */
  private onTouched = () => { };
}
