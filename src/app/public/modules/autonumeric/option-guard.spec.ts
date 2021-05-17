import { isPredefinedAutoNumericOption } from './option-guards';

describe('isPredefinedAutoNumericOption', () => {
  it(`should return true for predefined languages`, () => {
    // https://github.com/autoNumeric/autoNumeric#predefined-language-options
    const predefinedLanguages: string[] = [
      'French', 'Spanish', 'NorthAmerican', 'British',
      'Swiss', 'Japanese', 'Chinese', 'Brazilian', 'Turkish'
    ];
    expect(predefinedLanguages.every(isPredefinedAutoNumericOption)).toBeTruthy();
  });
  it(`should return true for predefined common options`, () => {
    // https://github.com/autoNumeric/autoNumeric#predefined-common-options
    const predefinedCommonOption: string[] = [
      'integer', 'integerPos', 'integerNeg',
      'float', 'floatPos', 'floatNeg',
      'euro', 'dollar'
    ];
    expect(predefinedCommonOption.every(isPredefinedAutoNumericOption)).toBeTruthy();
  });
  it(`should return false for non predefined options`, () => {
    const notPredefinedOptions: any[] = [
      {},
      { foo: 'foo', bar: 'bar' },
      { currencySymbol: '$' },
      '', 'NOT_A_VALID_OPTION',
      true, false,
      -1, 0, 1
    ];
    expect(notPredefinedOptions.every(isPredefinedAutoNumericOption)).toBeFalsy();
  });
});
