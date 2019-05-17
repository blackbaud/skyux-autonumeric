import { Directive, ElementRef, Input, OnInit, Optional } from '@angular/core';
import { SkyAutonumericConfig } from './autonumeric-config';
const autoNumeric: any = require('autonumeric');

@Directive({
  selector: '[skyAutonumeric]'
})
export class SkyAutonumericDirective implements OnInit {
  private _autonumericInstance: any;

  @Input() public skyAutonumericLanguagePreset: any;
  @Input() public skyAutonumericOptions: any;

  constructor (
    private _el: ElementRef,
    @Optional() private _globalConfig: SkyAutonumericConfig
  ) {
    this._globalConfig = this._globalConfig || new SkyAutonumericConfig();
  }

  public ngOnInit() {
    this._autonumericInstance = new autoNumeric(this._el.nativeElement);

    let preset = this.skyAutonumericLanguagePreset || this._globalConfig.languagePreset;
    if (preset) {
      this.updateAutonumericPreset(preset);
    }

    let options = {};
    if (this._globalConfig.options) {
      options = {...this._globalConfig.options};
    }
    if (this.skyAutonumericOptions) {
      options = {...options, ...this.skyAutonumericOptions};
    }
    this.updateAutonumericOptions(options);
  }

  public updateAutonumericPreset(preset: string) {
    this._autonumericInstance.update(autoNumeric.getPredefinedOptions()[preset]);
  }

  public updateAutonumericOptions(options: any) {
    this._autonumericInstance.update(options);
  }
}
