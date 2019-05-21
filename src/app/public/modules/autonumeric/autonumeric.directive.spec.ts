import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';

import {
  expect
} from '@skyux-sdk/testing';

import {
  SkyAutonumericConfig
} from './autonumeric-config';

import {
  AutonumericFixtureComponent
} from './fixtures/autonumeric.component.fixture';

import {
  AutonumericFixtureModule
} from './fixtures/autonumeric.module.fixture';

describe('Autonumeric directive', () => {
  let fixture: ComponentFixture<AutonumericFixtureComponent>;
  // let autonumericConfigFactory: () => void;
  let config: SkyAutonumericConfig;

  function detectChanges(): void {
    fixture.detectChanges();
    tick();
  }

  function setValue(value: number): void {
    fixture.componentInstance.formGroup.get('donationAmount').setValue(value);
  }

  function getFormattedValue(): string {
    return fixture.nativeElement.querySelector('input').value;
  }

  function getModelValue(): number {
    return fixture.componentInstance.formControl.value;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AutonumericFixtureModule
      ],
      providers: [
        {
          provide: SkyAutonumericConfig,
          useValue: config
        }
      ]
    });

    fixture = TestBed.createComponent(AutonumericFixtureComponent);
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

  it('should support custom global configuration', fakeAsync(() => {
    config = new SkyAutonumericConfig('French', {
      decimalPlaces: 5
    });

    detectChanges();

    setValue(1000);

    detectChanges();

    const modelValue = getModelValue();
    const formattedValue = getFormattedValue();

    expect(modelValue).toEqual(1000);
    expect(formattedValue).toEqual('1,000.00');
  }));

  it('should set correct statuses when initialized without value', fakeAsync(() => {
    detectChanges();
    expect(fixture.componentInstance.formControl.touched).toEqual(false);
    expect(fixture.componentInstance.formControl.pristine).toEqual(true);
    expect(fixture.componentInstance.formControl.valid).toEqual(true);
  }));

  it('should set correct statuses when initialized with a value', fakeAsync(() => {
    detectChanges();

    setValue(1000);

    detectChanges();

    expect(fixture.componentInstance.formControl.touched).toEqual(false);
    expect(fixture.componentInstance.formControl.pristine).toEqual(true);
    expect(fixture.componentInstance.formControl.valid).toEqual(true);
  }));

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
