import { COUNTRIES } from './data/countries.js';
import { getFlagEmoji, normalize, uid, injectStyles } from './utils.js';
import CSS from './styles.js';

const ARROW_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;
const CLEAR_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
const REMOVE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
const CHECK_SVG = `<svg class="cfs-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

const DEFAULTS = {
  placeholder: 'Select a country...',
  searchPlaceholder: 'Search countries...',
  multi: false,
  value: null,
  valueType: 'short',      // 'short' = code ('US') | 'long' = name ('United States')
  flagType: 'emoji',       // 'emoji' | 'image' | 'none'
  imageUrl: 'https://flagcdn.com/24x18/{code}.png',
  searchable: true,
  maxItems: null,
  onChange: null,
  countries: null,
  exclude: [],
  include: [],
  disabled: false,
  clearable: true,
  theme: 'auto',           // 'auto' | 'light' | 'dark'
};

export default class CountryFlagSelect {
  constructor(target, options = {}) {
    injectStyles(CSS);

    this._el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!this._el) throw new Error(`[CountryFlagSelect] Target not found: ${target}`);

    this._opts = { ...DEFAULTS, ...options };
    this._id = uid();
    this._open = false;
    this._focusIndex = -1;
    this._selected = new Set();
    this._filtered = [];

    // seed initial value
    const initVal = this._opts.value;
    if (initVal) {
      (Array.isArray(initVal) ? initVal : [initVal])
        .forEach(v => this._selected.add(v.toString().toUpperCase()));
    }

    this._buildList();
    this._filtered = [...this._list];
    this._render();
    this._bind();
    if (this._opts.disabled) this.disable();
  }

  /* ─── Private helpers ─── */

  _buildList() {
    let list = (this._opts.countries || COUNTRIES).slice();
    if (this._opts.include?.length) {
      const inc = this._opts.include.map(c => c.toUpperCase());
      list = list.filter(c => inc.includes(c.code));
      list.sort((a, b) => inc.indexOf(a.code) - inc.indexOf(b.code));
    }
    if (this._opts.exclude?.length) {
      const exc = this._opts.exclude.map(c => c.toUpperCase());
      list = list.filter(c => !exc.includes(c.code));
    }
    this._list = list;
  }

  _flag(code) {
    if (this._opts.flagType === 'none') return '';
    if (this._opts.flagType === 'image') {
      const src = this._opts.imageUrl.replace('{code}', code.toLowerCase());
      return `<img src="${src}" alt="${code}" style="width:24px;height:18px;object-fit:cover;border-radius:2px;flex-shrink:0">`;
    }
    return getFlagEmoji(code);
  }

  _render() {
    this._el.innerHTML = '';

    // Wrapper
    const themeClass = this._opts.theme !== 'auto' ? ` cfs-theme-${this._opts.theme}` : '';
    this._wrapper = this._el;
    this._el.className = `cfs-wrapper${themeClass}`;
    this._el.setAttribute('data-cfs', this._id);

    // Control
    this._ctrl = document.createElement('div');
    this._ctrl.className = 'cfs-control';
    this._ctrl.setAttribute('tabindex', '0');
    this._ctrl.setAttribute('role', 'combobox');
    this._ctrl.setAttribute('aria-haspopup', 'listbox');
    this._ctrl.setAttribute('aria-expanded', 'false');
    this._ctrl.setAttribute('aria-label', 'Country selector');

    // Arrow
    const arrow = document.createElement('span');
    arrow.className = 'cfs-arrow';
    arrow.innerHTML = ARROW_SVG;
    this._ctrl.appendChild(arrow);

    // Clear btn
    this._clearBtn = document.createElement('span');
    this._clearBtn.className = 'cfs-clear';
    this._clearBtn.innerHTML = CLEAR_SVG;
    this._clearBtn.style.display = 'none';
    this._clearBtn.setAttribute('aria-label', 'Clear selection');
    this._ctrl.appendChild(this._clearBtn);

    this._el.appendChild(this._ctrl);
    this._updateControl();
  }

  _buildMenu() {
    if (this._menu) this._menu.remove();

    this._menu = document.createElement('div');
    this._menu.className = 'cfs-menu';
    this._menu.setAttribute('role', 'listbox');

    if (this._opts.searchable) {
      const wrap = document.createElement('div');
      wrap.className = 'cfs-search-wrap';
      this._searchInput = document.createElement('input');
      this._searchInput.type = 'text';
      this._searchInput.className = 'cfs-search';
      this._searchInput.placeholder = this._opts.searchPlaceholder;
      this._searchInput.setAttribute('aria-label', 'Search countries');
      this._searchInput.setAttribute('autocomplete', 'off');
      this._searchInput.setAttribute('spellcheck', 'false');
      wrap.appendChild(this._searchInput);
      this._menu.appendChild(wrap);
    }

    this._listEl = document.createElement('div');
    this._listEl.className = 'cfs-options';
    this._menu.appendChild(this._listEl);

    this._el.appendChild(this._menu);
    this._renderOptions();
  }

  _renderOptions() {
    this._listEl.innerHTML = '';
    this._focusIndex = -1;

    if (!this._filtered.length) {
      const empty = document.createElement('div');
      empty.className = 'cfs-no-options';
      empty.textContent = 'No countries found';
      this._listEl.appendChild(empty);
      return;
    }

    this._filtered.forEach((country, i) => {
      const isSelected = this._selected.has(country.code);
      const item = document.createElement('div');
      item.className = `cfs-option${isSelected ? ' cfs-selected' : ''}`;
      item.setAttribute('role', 'option');
      item.setAttribute('aria-selected', String(isSelected));
      item.setAttribute('data-code', country.code);
      item.setAttribute('data-index', i);

      const flagContent = this._opts.flagType === 'image'
        ? this._flag(country.code)
        : `<span class="cfs-option-flag">${this._flag(country.code)}</span>`;

      item.innerHTML = `
        ${flagContent}
        <span class="cfs-option-name">${country.name}</span>
        <span class="cfs-option-code">${country.code}</span>
        ${isSelected ? CHECK_SVG : ''}
      `;

      item.addEventListener('mousedown', e => {
        e.preventDefault();
        this._toggle(country.code);
      });
      item.addEventListener('mouseenter', () => {
        this._setFocus(i);
      });

      this._listEl.appendChild(item);
    });
  }

  _updateControl() {
    // Remove old content except arrow & clear
    Array.from(this._ctrl.children).forEach(c => {
      if (!c.classList.contains('cfs-arrow') && !c.classList.contains('cfs-clear')) {
        c.remove();
      }
    });

    if (this._selected.size === 0) {
      const ph = document.createElement('span');
      ph.className = 'cfs-placeholder';
      ph.textContent = this._opts.placeholder;
      this._ctrl.insertBefore(ph, this._ctrl.firstChild);
    } else if (this._opts.multi) {
      // Tags
      const frag = document.createDocumentFragment();
      this._selected.forEach(code => {
        const country = this._list.find(c => c.code === code);
        if (!country) return;
        const tag = document.createElement('span');
        tag.className = 'cfs-tag';
        tag.innerHTML = `
          <span class="cfs-tag-flag">${this._flag(code)}</span>
          <span class="cfs-tag-name">${country.name}</span>
          <span class="cfs-tag-remove" data-code="${code}" aria-label="Remove ${country.name}">${REMOVE_SVG}</span>
        `;
        frag.appendChild(tag);
      });
      this._ctrl.insertBefore(frag, this._ctrl.firstChild);
    } else {
      // Single value
      const code = [...this._selected][0];
      const country = this._list.find(c => c.code === code);
      if (country) {
        const val = document.createElement('span');
        val.className = 'cfs-single-value';
        val.innerHTML = `
          <span class="cfs-single-flag">${this._flag(code)}</span>
          <span class="cfs-single-name">${country.name}</span>
        `;
        this._ctrl.insertBefore(val, this._ctrl.firstChild);
      }
    }

    // Show/hide clear button
    if (this._clearBtn) {
      this._clearBtn.style.display =
        this._opts.clearable && this._selected.size > 0 ? 'flex' : 'none';
    }
  }

  _toggle(code) {
    if (this._opts.multi) {
      if (this._selected.has(code)) {
        this._selected.delete(code);
      } else {
        if (this._opts.maxItems && this._selected.size >= this._opts.maxItems) return;
        this._selected.add(code);
      }
      this._updateControl();
      this._renderOptions();
    } else {
      this._selected.clear();
      this._selected.add(code);
      this._updateControl();
      this.close();
    }
    this._emit();
  }

  _emit() {
    if (typeof this._opts.onChange !== 'function') return;
    const val = this._buildValue();
    this._opts.onChange(val);
  }

  _buildValue() {
    const codes = [...this._selected];
    const mapped = codes.map(code => {
      if (this._opts.valueType === 'long') {
        return this._list.find(c => c.code === code)?.name ?? code;
      }
      return code;
    });
    return this._opts.multi ? mapped : (mapped[0] ?? null);
  }

  _setFocus(index) {
    const items = this._listEl.querySelectorAll('.cfs-option');
    items.forEach(el => el.classList.remove('cfs-focused'));
    this._focusIndex = index;
    if (index >= 0 && items[index]) {
      items[index].classList.add('cfs-focused');
      items[index].scrollIntoView({ block: 'nearest' });
    }
  }

  _filter(query) {
    const q = normalize(query.trim());
    this._filtered = q
      ? this._list.filter(c =>
          normalize(c.name).includes(q) ||
          normalize(c.code).includes(q)
        )
      : [...this._list];
    this._renderOptions();
  }

  /* ─── Event binding ─── */

  _bind() {
    // Control click → open/close
    this._ctrl.addEventListener('click', e => {
      if (this._opts.disabled) return;
      if (e.target.closest('.cfs-tag-remove')) return;
      if (e.target.closest('.cfs-clear')) return;
      this._open ? this.close() : this.open();
    });

    // Tag remove
    this._ctrl.addEventListener('click', e => {
      const btn = e.target.closest('.cfs-tag-remove');
      if (!btn) return;
      e.stopPropagation();
      const code = btn.dataset.code;
      this._selected.delete(code);
      this._updateControl();
      if (this._open) this._renderOptions();
      this._emit();
    });

    // Clear
    this._clearBtn.addEventListener('click', e => {
      e.stopPropagation();
      this.reset();
    });

    // Keyboard on control
    this._ctrl.addEventListener('keydown', e => {
      if (this._opts.disabled) return;
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (!this._open) this.open();
        else if (e.key === 'ArrowDown') this._setFocus(Math.min(this._focusIndex + 1, this._filtered.length - 1));
      } else if (e.key === 'Escape') {
        this.close();
      } else if (e.key === 'ArrowUp' && this._open) {
        e.preventDefault();
        this._setFocus(Math.max(this._focusIndex - 1, 0));
      } else if (e.key === 'Tab') {
        this.close();
      }
    });

    // Close on outside click
    this._docClick = e => {
      if (!this._el.contains(e.target)) this.close();
    };
    document.addEventListener('mousedown', this._docClick);
  }

  _bindMenu() {
    if (!this._searchInput) return;
    this._searchInput.addEventListener('input', e => this._filter(e.target.value));
    this._searchInput.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this._setFocus(Math.min(this._focusIndex + 1, this._filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this._setFocus(Math.max(this._focusIndex - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (this._focusIndex >= 0 && this._filtered[this._focusIndex]) {
          this._toggle(this._filtered[this._focusIndex].code);
        }
      } else if (e.key === 'Escape') {
        this.close();
        this._ctrl.focus();
      }
    });
  }

  /* ─── Public API ─── */

  open() {
    if (this._open || this._opts.disabled) return;
    this._open = true;
    this._el.classList.add('cfs-open');
    this._ctrl.setAttribute('aria-expanded', 'true');
    this._buildMenu();
    this._bindMenu();
    // Check if we should open upward
    const rect = this._el.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    if (spaceBelow < 300 && rect.top > 300) {
      this._menu.classList.add('cfs-menu-top');
    }
    if (this._searchInput) {
      setTimeout(() => this._searchInput.focus(), 30);
    }
  }

  close() {
    if (!this._open) return;
    this._open = false;
    this._el.classList.remove('cfs-open');
    this._ctrl.setAttribute('aria-expanded', 'false');
    if (this._searchInput) this._searchInput.value = '';
    this._filtered = [...this._list];
    if (this._menu) {
      this._menu.remove();
      this._menu = null;
      this._searchInput = null;
      this._listEl = null;
    }
  }

  getValue() {
    return this._buildValue();
  }

  setValue(value) {
    this._selected.clear();
    if (value !== null && value !== undefined) {
      (Array.isArray(value) ? value : [value])
        .forEach(v => this._selected.add(v.toString().toUpperCase()));
    }
    this._updateControl();
    if (this._open) this._renderOptions();
  }

  reset() {
    this._selected.clear();
    this._updateControl();
    if (this._open) this._renderOptions();
    this._emit();
  }

  enable() {
    this._opts.disabled = false;
    this._el.classList.remove('cfs-disabled');
  }

  disable() {
    this._opts.disabled = true;
    this._el.classList.add('cfs-disabled');
    this.close();
  }

  destroy() {
    document.removeEventListener('mousedown', this._docClick);
    if (this._menu) this._menu.remove();
    this._el.innerHTML = '';
    this._el.className = '';
    this._el.removeAttribute('data-cfs');
  }
}
