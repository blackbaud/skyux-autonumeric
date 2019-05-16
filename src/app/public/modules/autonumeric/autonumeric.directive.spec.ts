import { Component } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { By } from '@angular/platform-browser';

import {
  expect
} from '@skyux-sdk/testing';

import { AutonumericWrapperDirective } from './autonumeric.directive';
import { AutonumericConfig } from './autonumeric-config';

@Component({
  selector: 'autonumeric-wrapper-directive-test',
  template: '<input type="text" autonumeric [autonumericPreset]="preset" [autonumericOptions]="options">'
})
export class AutonumericWrapperDirectiveTestComponent {
  public preset: string;
  public options: any;
}

describe('Autonumeric wrapper directive', () => {
  let fixture: ComponentFixture<AutonumericWrapperDirectiveTestComponent>;
  let config: AutonumericConfig;

  beforeEach(() => {
    config = new AutonumericConfig();

    TestBed.configureTestingModule({
      declarations: [
        AutonumericWrapperDirectiveTestComponent,
        AutonumericWrapperDirective
      ],
      providers: [
        {
          provide: AutonumericConfig,
          useValue: config
        }
      ]
    });
  });

  it('successfully instantiates autonumeric without a global configuration', () => {
    // tslint:disable-next-line
    let autonumericDirectiveInstance = new AutonumericWrapperDirective(undefined, null);
    expect((<any> autonumericDirectiveInstance)._globalConfig).toBeDefined();
  });

  it('successfully configures the autonumeric instance', () => {
    fixture = TestBed.createComponent(AutonumericWrapperDirectiveTestComponent);

    let testComponentElement = fixture.debugElement.query(By.directive(AutonumericWrapperDirective));
    let directiveInstance = testComponentElement.injector.get(AutonumericWrapperDirective);
    spyOn(directiveInstance, 'updateAutonumericPreset').and.callThrough();
    spyOn(directiveInstance, 'updateAutonumericOptions').and.callThrough();

    fixture.detectChanges();

    expect((<any> directiveInstance.updateAutonumericPreset).calls.any()).toBe(false);

    let optionsCall = (<any> directiveInstance.updateAutonumericOptions).calls.mostRecent();
    expect((<any> directiveInstance.updateAutonumericOptions).calls.count()).toBe(1);
    expect(Object.keys(optionsCall.args[0]).length).toBe(0);

    expect(directiveInstance.autonumericPreset).toBe(undefined);
    expect(directiveInstance.autonumericOptions).toBe(undefined);
  });

  it('successfully configures the autonumeric instance when preset and options attributes are ommitted', async(() => {
    TestBed.overrideComponent(AutonumericWrapperDirectiveTestComponent, {
      set: {
        template: '<input type="text" autonumeric>'
      }
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(AutonumericWrapperDirectiveTestComponent);

      let testComponentElement = fixture.debugElement.query(By.directive(AutonumericWrapperDirective));
      let directiveInstance = testComponentElement.injector.get(AutonumericWrapperDirective);
      spyOn(directiveInstance, 'updateAutonumericPreset').and.callThrough();
      spyOn(directiveInstance, 'updateAutonumericOptions').and.callThrough();

      fixture.detectChanges();

      expect((<any> directiveInstance.updateAutonumericPreset).calls.any()).toBe(false);

      let optionsCall = (<any> directiveInstance.updateAutonumericOptions).calls.mostRecent();
      expect((<any> directiveInstance.updateAutonumericOptions).calls.count()).toBe(1);
      expect(Object.keys(optionsCall.args[0]).length).toBe(0);

      expect(directiveInstance.autonumericPreset).toBe(undefined);
      expect(directiveInstance.autonumericOptions).toBe(undefined);
    });
  }));

  it('successfully configures the autonumeric instance with a global preset and option', () => {
    config.preset = 'dollar';
    config.options = {
      decimalPlaces: 5
    };

    fixture = TestBed.createComponent(AutonumericWrapperDirectiveTestComponent);

    let testComponentElement = fixture.debugElement.query(By.directive(AutonumericWrapperDirective));
    let directiveInstance = testComponentElement.injector.get(AutonumericWrapperDirective);
    spyOn(directiveInstance, 'updateAutonumericPreset').and.callThrough();
    spyOn(directiveInstance, 'updateAutonumericOptions').and.callThrough();

    fixture.detectChanges();

    let presetCall = (<any> directiveInstance.updateAutonumericPreset).calls.mostRecent();
    expect((<any> directiveInstance.updateAutonumericPreset).calls.count()).toBe(1);
    expect(presetCall.args[0]).toBe(config.preset);

    let optionsCall = (<any> directiveInstance.updateAutonumericOptions).calls.mostRecent();
    expect((<any> directiveInstance.updateAutonumericOptions).calls.count()).toBe(1);
    expect(Object.keys(optionsCall.args[0]).length).toBe(1);
    expect(optionsCall.args[0].decimalPlaces).toBe(config.options.decimalPlaces);

    expect(directiveInstance.autonumericPreset).toBe(undefined);
    expect(directiveInstance.autonumericOptions).toBe(undefined);
  });

  it('successfully configures the autonumeric instance with a preset and options from the attribute', () => {
    fixture = TestBed.createComponent(AutonumericWrapperDirectiveTestComponent);

    fixture.componentInstance.preset = 'dollar';
    fixture.componentInstance.options = {
      decimalPlaces: 5
    };

    let testComponentElement = fixture.debugElement.query(By.directive(AutonumericWrapperDirective));
    let directiveInstance = testComponentElement.injector.get(AutonumericWrapperDirective);
    spyOn(directiveInstance, 'updateAutonumericPreset').and.callThrough();
    spyOn(directiveInstance, 'updateAutonumericOptions').and.callThrough();

    fixture.detectChanges();

    let presetCall = (<any> directiveInstance.updateAutonumericPreset).calls.mostRecent();
    expect((<any> directiveInstance.updateAutonumericPreset).calls.count()).toBe(1);
    expect(presetCall.args[0]).toBe(fixture.componentInstance.preset);

    let optionsCall = (<any> directiveInstance.updateAutonumericOptions).calls.mostRecent();
    expect((<any> directiveInstance.updateAutonumericOptions).calls.count()).toBe(1);
    expect(Object.keys(optionsCall.args[0]).length).toBe(1);
    expect(optionsCall.args[0].decimalPlaces).toBe(fixture.componentInstance.options.decimalPlaces);

    expect(directiveInstance.autonumericPreset).toBe(fixture.componentInstance.preset);
    expect(directiveInstance.autonumericOptions).toBe(fixture.componentInstance.options);
  });

  it('successfully configures the autonumeric instance with a global preset, global option and adds options from the attribute', () => {
    config.options = {
      decimalPlaces: 5
    };

    fixture = TestBed.createComponent(AutonumericWrapperDirectiveTestComponent);
    fixture.componentInstance.options = {
      digitGroupSeparator: ','
    };

    let testComponentElement = fixture.debugElement.query(By.directive(AutonumericWrapperDirective));
    let directiveInstance = testComponentElement.injector.get(AutonumericWrapperDirective);
    spyOn(directiveInstance, 'updateAutonumericPreset').and.callThrough();
    spyOn(directiveInstance, 'updateAutonumericOptions').and.callThrough();

    fixture.detectChanges();

    expect((<any> directiveInstance.updateAutonumericPreset).calls.any()).toBe(false);

    let optionsCall = (<any> directiveInstance.updateAutonumericOptions).calls.mostRecent();
    expect((<any> directiveInstance.updateAutonumericOptions).calls.count()).toBe(1);
    expect(Object.keys(optionsCall.args[0]).length).toBe(2);
    expect(optionsCall.args[0].decimalPlaces).toBe(config.options.decimalPlaces);
    expect(optionsCall.args[0].digitGroupSeparator).toBe(fixture.componentInstance.options.digitGroupSeparator);

    expect(directiveInstance.autonumericPreset).toBe(undefined);
    expect(directiveInstance.autonumericOptions).toBe(fixture.componentInstance.options);
  });

  it('successfully configures the autonumeric instance and overrides the global preset with the preset attribute', () => {
    config.preset = 'dollar';

    fixture = TestBed.createComponent(AutonumericWrapperDirectiveTestComponent);
    fixture.componentInstance.preset = 'euro';

    let testComponentElement = fixture.debugElement.query(By.directive(AutonumericWrapperDirective));
    let directiveInstance = testComponentElement.injector.get(AutonumericWrapperDirective);
    spyOn(directiveInstance, 'updateAutonumericPreset').and.callThrough();
    spyOn(directiveInstance, 'updateAutonumericOptions').and.callThrough();

    fixture.detectChanges();

    expect((<any> directiveInstance)._globalConfig.preset).toBe(config.preset);

    let presetCall = (<any> directiveInstance.updateAutonumericPreset).calls.mostRecent();
    expect((<any> directiveInstance.updateAutonumericPreset).calls.count()).toBe(1);
    expect(presetCall.args[0]).toBe(fixture.componentInstance.preset);

    let optionsCall = (<any> directiveInstance.updateAutonumericOptions).calls.mostRecent();
    expect((<any> directiveInstance.updateAutonumericOptions).calls.count()).toBe(1);
    expect(Object.keys(optionsCall.args[0]).length).toBe(0);

    expect(directiveInstance.autonumericPreset).toBe(fixture.componentInstance.preset);
    expect(directiveInstance.autonumericOptions).toBe(undefined);
  });
});
