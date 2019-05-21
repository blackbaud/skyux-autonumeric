import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';

import {
  AbstractControl
} from '@angular/forms';

import {
  expect,
  SkyAppTestUtility
} from '@skyux-sdk/testing';

// import {
//   SkyAutonumericOptionsProvider
// } from './autonumeric-options-provider';

import {
  AutonumericFixtureComponent
} from './fixtures/autonumeric.component.fixture';

import {
  AutonumericFixtureModule
} from './fixtures/autonumeric.module.fixture';

import {
  SkyAutonumericOptions
} from './autonumeric-options';

describe('Autonumeric directive', () => {
  let fixture: ComponentFixture<AutonumericFixtureComponent>;
  // let autonumericConfigFactory: () => void;

  function detectChanges(): void {
    fixture.detectChanges();
    tick();
  }

  function setValue(value: number): void {
    fixture.componentInstance.formGroup.get('donationAmount').setValue(value);
  }

  function setOptions(options: SkyAutonumericOptions): void {
    fixture.componentInstance.autonumericOptions = options;
  }

  function getFormattedValue(): string {
    return fixture.nativeElement.querySelector('input').value;
  }

  function getModelValue(): number {
    return fixture.componentInstance.formControl.value;
  }

  function verifyFormControlStatuses(
    control: AbstractControl,
    pristine: boolean,
    touched: boolean,
    valid: boolean
  ): void {
    expect(control.pristine).toEqual(pristine);
    expect(control.touched).toEqual(touched);
    expect(control.valid).toEqual(valid);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AutonumericFixtureModule
      ]
      // providers: [
      //   {
      //     provide: SkyAutonumericConfig,
      //     useValue: config
      //   }
      // ]
    });

    fixture = TestBed.createComponent(AutonumericFixtureComponent);
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should use default configuration', fakeAsync(() => {
    detectChanges();

    setValue(1000);

    detectChanges();

    const modelValue = getModelValue();
    const formattedValue = getFormattedValue();

    expect(modelValue).toEqual(1000);
    expect(formattedValue).toEqual('1,000.00');
  }));

  it('should support preset configuration', fakeAsync(() => {
    setOptions('dollar');

    detectChanges();

    setValue(1000);

    detectChanges();

    const modelValue = getModelValue();
    const formattedValue = getFormattedValue();

    expect(modelValue).toEqual(1000);
    expect(formattedValue).toEqual('$1,000.00');
  }));

  it('should support custom configuration', fakeAsync(() => {
    setOptions({
      decimalPlaces: 5
    });

    detectChanges();

    setValue(1000);

    detectChanges();

    const modelValue = getModelValue();
    const formattedValue = getFormattedValue();

    expect(modelValue).toEqual(1000);
    expect(formattedValue).toEqual('1,000.00000');
  }));

  it('should update numeric value on blur', fakeAsync(() => {
    detectChanges();

    const autonumericInstance = fixture.componentInstance.autonumericDirective['autonumericInstance'];
    const spy = spyOn(autonumericInstance, 'getNumber').and.callThrough();

    const input = fixture.nativeElement.querySelector('input');

    SkyAppTestUtility.fireDomEvent(input, 'blur');
    detectChanges();

    expect(spy).toHaveBeenCalled();
  }));

  it('should be accessible', async(() => {
    fixture.detectChanges();

    setValue(1000);

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(fixture.nativeElement).toBeAccessible();
    });
  }));

  // it('should support custom global configuration', fakeAsync(() => {
  //   config = new SkyAutonumericConfig('French', {
  //     decimalPlaces: 5
  //   });

  //   detectChanges();

  //   setValue(1000);

  //   detectChanges();

  //   const modelValue = getModelValue();
  //   const formattedValue = getFormattedValue();

  //   expect(modelValue).toEqual(1000);
  //   expect(formattedValue).toEqual('1,000.00');
  // }));

  describe('Angular form control statuses', () => {

    it('should set correct statuses when initialized without value', fakeAsync(() => {
      detectChanges();

      verifyFormControlStatuses(
        fixture.componentInstance.formControl,
        true,
        false,
        true
      );
    }));

    it('should set correct statuses when initialized with a value', fakeAsync(() => {
      detectChanges();

      setValue(1000);

      detectChanges();

      verifyFormControlStatuses(
        fixture.componentInstance.formControl,
        true,
        false,
        true
      );
    }));

    it('should mark the control as touched on blur', fakeAsync(() => {
      detectChanges();

      expect(fixture.componentInstance.formControl.touched).toEqual(false);

      SkyAppTestUtility.fireDomEvent(fixture.nativeElement.querySelector('input'), 'blur');

      detectChanges();

      expect(fixture.componentInstance.formControl.touched).toEqual(true);
    }));

    it('should mark the control as dirty on keyup', fakeAsync(() => {
      detectChanges();

      expect(fixture.componentInstance.formControl.dirty).toEqual(false);

      SkyAppTestUtility.fireDomEvent(fixture.nativeElement.querySelector('input'), 'keyup');

      detectChanges();

      expect(fixture.componentInstance.formControl.dirty).toEqual(true);
    }));

  });

  // fit('successfully configures the autonumeric instance', () => {
  //   fixture = TestBed.createComponent(AutonumericFixtureComponent);

  //   let testComponentElement = fixture.debugElement.query(By.directive(SkyAutonumericDirective));
  //   let directiveInstance = testComponentElement.injector.get(SkyAutonumericDirective);
  //   spyOn(directiveInstance, 'updateAutonumericPreset').and.callThrough();
  //   spyOn(directiveInstance, 'updateAutonumericOptions').and.callThrough();

  //   fixture.detectChanges();

  //   expect((<any> directiveInstance.updateAutonumericPreset).calls.any()).toBe(false);

  //   let optionsCall = (<any> directiveInstance.updateAutonumericOptions).calls.mostRecent();
  //   expect((<any> directiveInstance.updateAutonumericOptions).calls.count()).toBe(1);
  //   expect(Object.keys(optionsCall.args[0]).length).toBe(0);

  //   expect(directiveInstance.skyAutonumericLanguagePreset).toBe(undefined);
  //   expect(directiveInstance.skyAutonumericOptions).toBe(undefined);
  // });

  // it('successfully configures the autonumeric instance when preset and options attributes are ommitted', async(() => {
  //   TestBed.overrideComponent(AutonumericFixtureComponent, {
  //     set: {
  //       template: '<input type="text" skyAutonumeric>'
  //     }
  //   });

  //   TestBed.compileComponents().then(() => {
  //     fixture = TestBed.createComponent(AutonumericFixtureComponent);

  //     let testComponentElement = fixture.debugElement.query(By.directive(SkyAutonumericDirective));
  //     let directiveInstance = testComponentElement.injector.get(SkyAutonumericDirective);
  //     spyOn(directiveInstance, 'updateAutonumericPreset').and.callThrough();
  //     spyOn(directiveInstance, 'updateAutonumericOptions').and.callThrough();

  //     fixture.detectChanges();

  //     expect((<any> directiveInstance.updateAutonumericPreset).calls.any()).toBe(false);

  //     let optionsCall = (<any> directiveInstance.updateAutonumericOptions).calls.mostRecent();
  //     expect((<any> directiveInstance.updateAutonumericOptions).calls.count()).toBe(1);
  //     expect(Object.keys(optionsCall.args[0]).length).toBe(0);

  //     expect(directiveInstance.skyAutonumericLanguagePreset).toBe(undefined);
  //     expect(directiveInstance.skyAutonumericOptions).toBe(undefined);
  //   });
  // }));

  // it('successfully configures the autonumeric instance with a global preset and option', () => {
  //   config.languagePreset = 'dollar';
  //   config.options = {
  //     decimalPlaces: 5
  //   };

  //   fixture = TestBed.createComponent(AutonumericFixtureComponent);

  //   let testComponentElement = fixture.debugElement.query(By.directive(SkyAutonumericDirective));
  //   let directiveInstance = testComponentElement.injector.get(SkyAutonumericDirective);
  //   spyOn(directiveInstance, 'updateAutonumericPreset').and.callThrough();
  //   spyOn(directiveInstance, 'updateAutonumericOptions').and.callThrough();

  //   fixture.detectChanges();

  //   let presetCall = (<any> directiveInstance.updateAutonumericPreset).calls.mostRecent();
  //   expect((<any> directiveInstance.updateAutonumericPreset).calls.count()).toBe(1);
  //   expect(presetCall.args[0]).toBe(config.languagePreset);

  //   let optionsCall = (<any> directiveInstance.updateAutonumericOptions).calls.mostRecent();
  //   expect((<any> directiveInstance.updateAutonumericOptions).calls.count()).toBe(1);
  //   expect(Object.keys(optionsCall.args[0]).length).toBe(1);
  //   expect(optionsCall.args[0].decimalPlaces).toBe(config.options.decimalPlaces);

  //   expect(directiveInstance.skyAutonumericLanguagePreset).toBe(undefined);
  //   expect(directiveInstance.skyAutonumericOptions).toBe(undefined);
  // });

  // it('successfully configures the autonumeric instance with a preset and options from the attribute', () => {
  //   fixture = TestBed.createComponent(AutonumericFixtureComponent);

  //   fixture.componentInstance.preset = 'dollar';
  //   fixture.componentInstance.options = {
  //     decimalPlaces: 5
  //   };

  //   let testComponentElement = fixture.debugElement.query(By.directive(SkyAutonumericDirective));
  //   let directiveInstance = testComponentElement.injector.get(SkyAutonumericDirective);
  //   spyOn(directiveInstance, 'updateAutonumericPreset').and.callThrough();
  //   spyOn(directiveInstance, 'updateAutonumericOptions').and.callThrough();

  //   fixture.detectChanges();

  //   let presetCall = (<any> directiveInstance.updateAutonumericPreset).calls.mostRecent();
  //   expect((<any> directiveInstance.updateAutonumericPreset).calls.count()).toBe(1);
  //   expect(presetCall.args[0]).toBe(fixture.componentInstance.preset);

  //   let optionsCall = (<any> directiveInstance.updateAutonumericOptions).calls.mostRecent();
  //   expect((<any> directiveInstance.updateAutonumericOptions).calls.count()).toBe(1);
  //   expect(Object.keys(optionsCall.args[0]).length).toBe(1);
  //   expect(optionsCall.args[0].decimalPlaces).toBe(fixture.componentInstance.options.decimalPlaces);

  //   expect(directiveInstance.skyAutonumericLanguagePreset).toBe(fixture.componentInstance.preset);
  //   expect(directiveInstance.skyAutonumericOptions).toBe(fixture.componentInstance.options);
  // });

  // it('successfully configures the autonumeric instance with a global preset, global option and adds options from the attribute', () => {
  //   config.options = {
  //     decimalPlaces: 5
  //   };

  //   fixture = TestBed.createComponent(AutonumericFixtureComponent);
  //   fixture.componentInstance.options = {
  //     digitGroupSeparator: ','
  //   };

  //   let testComponentElement = fixture.debugElement.query(By.directive(SkyAutonumericDirective));
  //   let directiveInstance = testComponentElement.injector.get(SkyAutonumericDirective);
  //   spyOn(directiveInstance, 'updateAutonumericPreset').and.callThrough();
  //   spyOn(directiveInstance, 'updateAutonumericOptions').and.callThrough();

  //   fixture.detectChanges();

  //   expect((<any> directiveInstance.updateAutonumericPreset).calls.any()).toBe(false);

  //   let optionsCall = (<any> directiveInstance.updateAutonumericOptions).calls.mostRecent();
  //   expect((<any> directiveInstance.updateAutonumericOptions).calls.count()).toBe(1);
  //   expect(Object.keys(optionsCall.args[0]).length).toBe(2);
  //   expect(optionsCall.args[0].decimalPlaces).toBe(config.options.decimalPlaces);
  //   expect(optionsCall.args[0].digitGroupSeparator).toBe(fixture.componentInstance.options.digitGroupSeparator);

  //   expect(directiveInstance.skyAutonumericLanguagePreset).toBe(undefined);
  //   expect(directiveInstance.skyAutonumericOptions).toBe(fixture.componentInstance.options);
  // });

  // it('successfully configures the autonumeric instance and overrides the global preset with the preset attribute', () => {
  //   config.languagePreset = 'dollar';

  //   fixture = TestBed.createComponent(AutonumericFixtureComponent);
  //   fixture.componentInstance.preset = 'euro';

  //   let testComponentElement = fixture.debugElement.query(By.directive(SkyAutonumericDirective));
  //   let directiveInstance = testComponentElement.injector.get(SkyAutonumericDirective);
  //   spyOn(directiveInstance, 'updateAutonumericPreset').and.callThrough();
  //   spyOn(directiveInstance, 'updateAutonumericOptions').and.callThrough();

  //   fixture.detectChanges();

  //   expect((<any> directiveInstance)._globalConfig.languagePreset).toBe(config.languagePreset);

  //   let presetCall = (<any> directiveInstance.updateAutonumericPreset).calls.mostRecent();
  //   expect((<any> directiveInstance.updateAutonumericPreset).calls.count()).toBe(1);
  //   expect(presetCall.args[0]).toBe(fixture.componentInstance.preset);

  //   let optionsCall = (<any> directiveInstance.updateAutonumericOptions).calls.mostRecent();
  //   expect((<any> directiveInstance.updateAutonumericOptions).calls.count()).toBe(1);
  //   expect(Object.keys(optionsCall.args[0]).length).toBe(0);

  //   expect(directiveInstance.skyAutonumericLanguagePreset).toBe(fixture.componentInstance.preset);
  //   expect(directiveInstance.skyAutonumericOptions).toBe(undefined);
  // });
});
