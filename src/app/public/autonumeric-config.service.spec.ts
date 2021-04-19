import {
  TestBed
} from '@angular/core/testing';

import {
  expect
} from '@skyux-sdk/testing';

import {
  Options as AutonumericOptions
} from 'autonumeric';

import {
  SkyAutonumericConfigService
} from './modules/autonumeric/autonumeric-config.service';

import {
  SkyAutonumericModule
} from './modules/autonumeric/autonumeric.module';

import {
  SkyAutonumericOptions
} from './modules/autonumeric/autonumeric-options';

import {
  SkyAutonumericOptionsProvider
} from './modules/autonumeric/autonumeric-options-provider';

describe('SkyAutonumericConfigService', () => {
  let service: SkyAutonumericConfigService;
  let globalOptionsProvider: SkyAutonumericOptionsProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SkyAutonumericModule]
    });

    service = TestBed.inject(SkyAutonumericConfigService);
    globalOptionsProvider = TestBed.inject(SkyAutonumericOptionsProvider);
  });

  describe('getAutonumericOptions', () => {
    it('should respect and prioritize global options', () => {
      spyOn(globalOptionsProvider, 'getConfig').and.returnValue({ currencySymbol: '#' });

      const option: AutonumericOptions = service.getAutonumericOptions(undefined);
      expect(option.currencySymbol).toBe('#');
    });
    it('should allow no options to be passed', () => {
      const option = service.getAutonumericOptions();
      expect(option).toBeDefined();
    });
    it('should handle Autonumeric predefined language options', () => {
      const option = service.getAutonumericOptions('French');
      expect(option).toBeDefined();
    });
    it('should handle Autonumeric predefined common options', () => {
      const option = service.getAutonumericOptions('integer');
      expect(option).toBeDefined();
    });
    it('should handle custom Autonumeric options', () => {
      const option = service.getAutonumericOptions({ currencySymbol: '$' });
      expect(option).toBeDefined();
    });
  });

  describe('createOptionsForCurrencyAndLocaleMode', () => {
    it('should handle custom "Currency and Locale" options when code and locale are passed', async () => {
      const option = await service.getAutonumericOptionsForCurrencyAndLocaleMode('USD', 'en-CA').toPromise();
      expect(option).toBeDefined();
    });
    it('should handle custom "Currency and Locale" options when only code is passed', async () => {
      const option = await service.getAutonumericOptionsForCurrencyAndLocaleMode('CAD').toPromise();
      expect(option).toBeDefined();
    });
    it('should handle custom "Currency and Locale" options whe nothing is passed', async () => {
      const option = await service.getAutonumericOptionsForCurrencyAndLocaleMode().toPromise();
      expect(option).toBeDefined();
    });
  });

});
