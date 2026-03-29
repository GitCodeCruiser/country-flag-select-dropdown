# country-flag-select 🌍

[![npm version](https://img.shields.io/npm/v/country-flag-select.svg)](https://www.npmjs.com/package/country-flag-select)
[![license](https://img.shields.io/npm/l/country-flag-select.svg)](LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/country-flag-select)](https://bundlephobia.com/package/country-flag-select)
[![GitHub](https://img.shields.io/github/stars/GitCodeCruiser/country-flag-select-dropdown?style=social)](https://github.com/GitCodeCruiser/country-flag-select-dropdown)

A **lightweight, zero-dependency** country selector dropdown with emoji flags.  
Works everywhere — Vanilla JS, React, Vue, or any framework.

![country-flag-select preview](https://raw.githubusercontent.com/GitCodeCruiser/country-flag-select-dropdown/main/preview.png)

- ✅ **Zero dependencies** — no jQuery, no moment, nothing
- 🌍 **253 countries & territories** with ISO codes (inc. England, Kosovo, Hong Kong & more)
- 🏳 **Emoji flags** + **254 bundled PNG flags** included
- 🔍 **Searchable** — instant filter as you type
- 🎯 **Multi-select** — with removable tags
- 🌙 **Dark mode** — auto-detects system preference
- ♿ **Accessible** — keyboard nav + ARIA attributes
- 📦 **ESM + CJS + UMD** — works everywhere
- 📐 **TypeScript** — full type definitions included

---

## Installation

```bash
npm install country-flag-select
# or
yarn add country-flag-select
# or
pnpm add country-flag-select
```

---

## Quick Start

### Vanilla JS

```js
import { CountryFlagSelect } from 'country-flag-select';

const select = new CountryFlagSelect('#my-select', {
  onChange: (value) => console.log(value), // 'US'
});
```

### React

```jsx
import { CountryFlagSelect } from 'country-flag-select/react';

function MyForm() {
  const [country, setCountry] = useState(null);
  return <CountryFlagSelect value={country} onChange={setCountry} />;
}
```

### Vue 3

```vue
<script setup>
import { ref } from 'vue';
import CountryFlagSelect from 'country-flag-select/vue';
const country = ref(null);
</script>

<template>
  <CountryFlagSelect v-model="country" />
</template>
```

### CDN (no build step)

```html
<script src="https://unpkg.com/country-flag-select/dist/index.umd.js"></script>
<div id="my-select"></div>
<script>
  const { CountryFlagSelect } = window.CountryFlagSelect;
  new CountryFlagSelect('#my-select', { onChange: console.log });
</script>
```

---

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `multi` | `boolean` | `false` | Enable multi-select mode |
| `valueType` | `'short'\|'long'` | `'short'` | Return ISO code (`'US'`) or full name (`'United States'`) |
| `flagType` | `'emoji'\|'image'\|'png'\|'none'` | `'emoji'` | How to render flags |
| `flagsPath` | `string` | `null` | Base path to bundled PNG flags (when `flagType: 'png'`) |
| `value` | `string\|string[]` | `null` | Initial selected value(s) |
| `placeholder` | `string` | `'Select a country...'` | Placeholder text |
| `searchable` | `boolean` | `true` | Show search input |
| `clearable` | `boolean` | `true` | Show clear button |
| `maxItems` | `number` | `null` | Max selections (multi mode) |
| `include` | `string[]` | `[]` | Whitelist country codes |
| `exclude` | `string[]` | `[]` | Blacklist country codes |
| `countries` | `Country[]` | `null` | Override country list |
| `theme` | `'auto'\|'light'\|'dark'` | `'auto'` | Color theme |
| `disabled` | `boolean` | `false` | Disable component |
| `imageUrl` | `string` | flagcdn.com | URL template for image flags (`{code}` = country code) |
| `onChange` | `function` | `null` | Callback on selection change |

---

## Examples

```js
// Single select — returns code
new CountryFlagSelect('#el', {
  onChange: (val) => console.log(val), // 'US'
});

// Single select — returns full name
new CountryFlagSelect('#el', {
  valueType: 'long',
  onChange: (val) => console.log(val), // 'United States'
});

// Multi-select
new CountryFlagSelect('#el', {
  multi: true,
  onChange: (val) => console.log(val), // ['US', 'GB', 'CA']
});

// Multi-select — full names, max 3
new CountryFlagSelect('#el', {
  multi: true,
  valueType: 'long',
  maxItems: 3,
  onChange: (val) => console.log(val), // ['United States', ...]
});

// Pre-selected value
new CountryFlagSelect('#el', {
  value: 'JP',  // or ['US', 'GB'] for multi
});

// Only show specific countries
new CountryFlagSelect('#el', {
  include: ['US', 'GB', 'CA', 'AU', 'NZ'],
});

// Exclude specific countries
new CountryFlagSelect('#el', {
  exclude: ['KP', 'IR'],
});

// Force dark theme
new CountryFlagSelect('#el', {
  theme: 'dark',
});

// Image flags (from flagcdn.com)
new CountryFlagSelect('#el', {
  flagType: 'image',
  imageUrl: 'https://flagcdn.com/24x18/{code}.png',
});

// Custom country list
new CountryFlagSelect('#el', {
  countries: [
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
  ],
});
```

---

## Public API

```js
const select = new CountryFlagSelect('#el', options);

select.getValue();        // → 'US' | ['US','GB'] | null
select.setValue('FR');    // set programmatically
select.setValue(['US', 'GB']); // multi
select.reset();           // clear selection
select.open();            // open dropdown
select.close();           // close dropdown
select.enable();          // remove disabled state
select.disable();         // disable interaction
select.destroy();         // remove from DOM + clean up events
```

---

## React — Full Example

```jsx
import { useState } from 'react';
import { CountryFlagSelect } from 'country-flag-select/react';

export function CountryForm() {
  const [country, setCountry] = useState(null);
  const [countries, setCountries] = useState([]);

  return (
    <form>
      {/* Single */}
      <CountryFlagSelect
        value={country}
        onChange={setCountry}
        placeholder="Select country..."
        valueType="short"
        theme="auto"
      />

      {/* Multi */}
      <CountryFlagSelect
        value={countries}
        onChange={setCountries}
        multi
        valueType="long"
        maxItems={5}
      />
    </form>
  );
}
```

---

## Vue 3 — Full Example

```vue
<script setup>
import { ref } from 'vue';
import { CountryFlagSelect } from 'country-flag-select/vue';

const country = ref(null);
const countries = ref([]);
</script>

<template>
  <!-- Single (v-model) -->
  <CountryFlagSelect
    v-model="country"
    value-type="short"
    theme="auto"
    @change="handleChange"
  />

  <!-- Multi -->
  <CountryFlagSelect
    v-model="countries"
    :multi="true"
    value-type="long"
    :max-items="3"
  />
</template>
```

---

## TypeScript

Full TypeScript types are included out of the box — no `@types/` package needed.

```ts
import { CountryFlagSelect, CountryFlagSelectOptions, Country } from 'country-flag-select';

const options: CountryFlagSelectOptions = {
  multi: true,
  valueType: 'short',
  onChange: (val: string | string[] | null) => {
    console.log(val);
  },
};

const select = new CountryFlagSelect('#el', options);
```

---

## Theming & Customization

The component uses CSS custom properties. Override them in your stylesheet:

```css
.cfs-wrapper {
  --cfs-accent: #6366f1;       /* active border & highlights */
  font-size: 15px;             /* control overall size */
  width: 300px;                /* control width */
}
```

---

## License

MIT © [GitCodeCruiser](https://github.com/GitCodeCruiser)
