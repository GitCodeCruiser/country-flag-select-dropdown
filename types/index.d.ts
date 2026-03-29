export interface Country {
  code: string;
  name: string;
}

export type ValueType = 'short' | 'long';
export type FlagType = 'emoji' | 'image' | 'none';
export type Theme = 'auto' | 'light' | 'dark';

export interface CountryFlagSelectOptions {
  /** Placeholder text when nothing is selected. Default: 'Select a country...' */
  placeholder?: string;
  /** Placeholder inside the search input. Default: 'Search countries...' */
  searchPlaceholder?: string;
  /** Allow selecting multiple countries. Default: false */
  multi?: boolean;
  /** Initial selected value(s). ISO code string or array of codes. */
  value?: string | string[] | null;
  /**
   * What the onChange callback receives and getValue() returns.
   * 'short' = ISO code ('US'), 'long' = full name ('United States').
   * Default: 'short'
   */
  valueType?: ValueType;
  /**
   * How to render the flag.
   * 'emoji' = unicode emoji (🇺🇸), 'image' = <img> tag, 'none' = no flag.
   * Default: 'emoji'
   */
  flagType?: FlagType;
  /** URL template for flag images. Use {code} as placeholder. Default: flagcdn.com */
  imageUrl?: string;
  /** Show search input in dropdown. Default: true */
  searchable?: boolean;
  /** Maximum selectable countries (multi mode only). */
  maxItems?: number | null;
  /** Callback fired when selection changes. */
  onChange?: (value: string | string[] | null) => void;
  /** Override the full country list. */
  countries?: Country[];
  /** Only show these country codes. */
  include?: string[];
  /** Hide these country codes. */
  exclude?: string[];
  /** Disable the component. Default: false */
  disabled?: boolean;
  /** Show clear button. Default: true */
  clearable?: boolean;
  /** Color theme. Default: 'auto' (follows system preference) */
  theme?: Theme;
}

export declare class CountryFlagSelect {
  constructor(target: string | HTMLElement, options?: CountryFlagSelectOptions);

  /** Open the dropdown */
  open(): void;
  /** Close the dropdown */
  close(): void;
  /** Get current value (code or name string, or array in multi mode) */
  getValue(): string | string[] | null;
  /** Programmatically set value (ISO code string or array) */
  setValue(value: string | string[] | null): void;
  /** Clear selection */
  reset(): void;
  /** Enable the component */
  enable(): void;
  /** Disable the component */
  disable(): void;
  /** Remove the component and clean up DOM + event listeners */
  destroy(): void;
}

export declare const COUNTRIES: Country[];
export declare function getFlagEmoji(code: string): string;

export default CountryFlagSelect;
