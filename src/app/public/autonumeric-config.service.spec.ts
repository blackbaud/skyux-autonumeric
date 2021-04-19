import {
  TestBed
} from '@angular/core/testing';

import {
  expect
} from '@skyux-sdk/testing';

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

  function getAutonumericOptions(options?: SkyAutonumericOptions): Promise<SkyAutonumericOptions> {
    return service.getAutonumericOptions(options).toPromise();
  }

  describe('getAutonumericOptions', () => {
    it('should respect and prioritize global options', async () => {
      spyOn(globalOptionsProvider, 'getConfig')
        .and
        .returnValue({ currencySymbol: '#' });

      const option = await getAutonumericOptions(undefined);
      expect((option as any).currencySymbol).toBe('#');
    });
    it('should allow no options to be passed', async () => {
      const option = await getAutonumericOptions();
      expect(option).toBeDefined();
    });
    it('should handle Autonumeric predefined language options', async () => {
      const option = await getAutonumericOptions('French');
      expect(option).toBeDefined();
    });
    it('should handle Autonumeric predefined common options', async () => {
      const option = await getAutonumericOptions('integer');
      expect(option).toBeDefined();
    });
    it('should handle custom Autonumeric options', async () => {
      const option = await getAutonumericOptions({ currencySymbol: '$' });
      expect(option).toBeDefined();
    });
    it('should handle custom "Currency and Locale" options', async () => {
      const option = await getAutonumericOptions({ isoCurrencyCode: 'USD', locale: 'en-CA' });
      expect(option).toBeDefined();
    });
  });

});
