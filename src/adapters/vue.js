/**
 * Vue 3 adapter for country-flag-select
 * Usage: import CountryFlagSelect from 'country-flag-select/vue'
 *
 * Requires Vue 3 as a peer dependency.
 */
import { defineComponent, h, onMounted, onBeforeUnmount, ref, watch } from 'vue';
import CountrySelectCore from '../CountrySelect.js';

export const CountryFlagSelect = defineComponent({
  name: 'CountryFlagSelect',

  props: {
    modelValue: { type: [String, Array], default: null },
    multi: { type: Boolean, default: false },
    valueType: { type: String, default: 'short' },
    flagType: { type: String, default: 'emoji' },
    placeholder: { type: String, default: 'Select a country...' },
    searchPlaceholder: { type: String, default: 'Search countries...' },
    searchable: { type: Boolean, default: true },
    clearable: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    maxItems: { type: Number, default: null },
    include: { type: Array, default: () => [] },
    exclude: { type: Array, default: () => [] },
    countries: { type: Array, default: null },
    imageUrl: { type: String, default: 'https://flagcdn.com/24x18/{code}.png' },
    theme: { type: String, default: 'auto' },
  },

  emits: ['update:modelValue', 'change'],

  setup(props, { emit }) {
    const container = ref(null);
    let instance = null;

    onMounted(() => {
      instance = new CountrySelectCore(container.value, {
        ...props,
        value: props.modelValue,
        onChange(val) {
          emit('update:modelValue', val);
          emit('change', val);
        },
      });
    });

    onBeforeUnmount(() => {
      instance?.destroy();
      instance = null;
    });

    watch(() => props.modelValue, val => {
      instance?.setValue(val ?? null);
    });

    watch(() => props.disabled, val => {
      if (val) instance?.disable();
      else instance?.enable();
    });

    return () => h('div', { ref: container });
  },
});

export default CountryFlagSelect;
