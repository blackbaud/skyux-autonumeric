import { Observable } from 'rxjs';

/**
 * THIS IS MOCKING OUT THE EVENTUAL EXISTENCE OF THIS FILE IN SKYUX-I18N
 */

type IsoCodeAndLocale = { isoCode: string; locale: string };
export interface SkyI18nSkyCurrencyFormatService {
  getCurrencyFormat(params?: Partial<IsoCodeAndLocale>): SkyCurrencyFormat;
  getCurrencyFormatAsync(params?: Partial<IsoCodeAndLocale>): Observable<SkyCurrencyFormat>;
  getCurrencyPrecision(isoCode: string): number;
}

/**
 * The formatting options for Currency + Locale.
 */
export interface SkyCurrencyFormat {
  /** The Locale */
  locale: string;
  /** The ISO 4217 Code */
  isoCode: string;
  /** The symbol */
  symbol: string;
  /** The symbol's location -- prefix or suffix? */
  symbolLocation: 'p' | 's';
  /** The fractional decimal character  */
  decimalCharacter: string;
  /** The grouping character (1,000) */
  groupCharacter: string;
  /** The numeric precision (decimal places) */
  precision: number;
}
