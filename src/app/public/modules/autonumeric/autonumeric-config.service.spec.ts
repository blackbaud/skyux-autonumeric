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
} from './autonumeric-config.service';

import {
  SkyAutonumericModule
} from './autonumeric.module';

import {
  SkyAutonumericOptionsProvider
} from './autonumeric-options-provider';

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

  describe('getSkyAutonumericDefaults', () => {
    describe('currency', () => {
      it('should handle when code and locale are passed', () => {
        const option = service.getSkyAutonumericDefaults({
          currency: { isoCurrencyCode: 'USD', locale: 'en-CA' }
        });
        expect(option).toBeDefined();
      });
      it('should handle when code and locale are passed', () => {
        const option = service.getSkyAutonumericDefaults({
          currency: { isoCurrencyCode: 'JPY', locale: 'es-ES' }
        });
        expect(option).toBeDefined();
      });
      it('should handle when only code is passed', () => {
        const option = service.getSkyAutonumericDefaults({
          currency: { isoCurrencyCode: 'CAD' }
        });
        expect(option).toBeDefined();
      });
      it('should handle when nothing is passed', () => {
        const option = service.getSkyAutonumericDefaults({
          currency: { }
        });
        expect(option).toBeDefined();
      });
    });
  });

});
