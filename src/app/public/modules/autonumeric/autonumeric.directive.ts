import { Directive, ElementRef, Input, OnInit, Optional } from '@angular/core';
import { AutonumericConfig } from './autonumeric-config';
let autoNumeric: any = require('autonumeric');

@Directive({
  selector: '[autonumeric]'
})
export class AutonumericWrapperDirective implements OnInit {
  private _autonumericInstance: any;

  @Input() public autonumericPreset: any;
  @Input() public autonumericOptions: any;

  constructor (
    private _el: ElementRef,
    @Optional() private _globalConfig: AutonumericConfig
  ) {
    this._globalConfig = this._globalConfig || new AutonumericConfig();
  }

  public ngOnInit() {
    this._autonumericInstance = new autoNumeric(this._el.nativeElement);

    let preset = this.autonumericPreset || this._globalConfig.preset;
    if (preset) {
      this.updateAutonumericPreset(preset);
    }

    let options = {};
    if (this._globalConfig.options) {
      options = {...this._globalConfig.options};
    }
    if (this.autonumericOptions) {
      options = {...options, ...this.autonumericOptions};
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
