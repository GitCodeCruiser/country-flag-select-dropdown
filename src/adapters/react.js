/**
 * React adapter for country-flag-select
 * Usage: import { CountryFlagSelect } from 'country-flag-select/react'
 *
 * Requires React 16.8+ as a peer dependency.
 */
import { useEffect, useRef, createElement } from 'react';
import CountrySelectCore from '../CountrySelect.js';

export function CountryFlagSelect({ onChange, value, multi = false, style, className, ...options }) {
  const containerRef = useRef(null);
  const instanceRef = useRef(null);

  // Mount
  useEffect(() => {
    if (!containerRef.current) return;
    instanceRef.current = new CountrySelectCore(containerRef.current, {
      ...options,
      multi,
      value: value ?? null,
      onChange,
    });
    return () => {
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync external value changes
  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.setValue(value ?? null);
    }
  }, [value]);

  // Sync disabled state
  useEffect(() => {
    if (!instanceRef.current) return;
    if (options.disabled) instanceRef.current.disable();
    else instanceRef.current.enable();
  }, [options.disabled]);

  return createElement('div', { ref: containerRef, style, className });
}

export default CountryFlagSelect;
