import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const plugins = [nodeResolve(), terser()];

export default [
  // ── Core (Vanilla JS) ──
  {
    input: 'src/index.js',
    output: [
      { file: 'dist/index.cjs.js', format: 'cjs', exports: 'named' },
      { file: 'dist/index.esm.js', format: 'esm' },
      {
        file: 'dist/index.umd.js',
        format: 'umd',
        name: 'CountryFlagSelect',
        exports: 'named',
      },
    ],
    plugins,
  },

  // ── React adapter ──
  {
    input: 'src/adapters/react.js',
    external: ['react'],
    output: [
      { file: 'dist/react.cjs.js', format: 'cjs', exports: 'named' },
      { file: 'dist/react.esm.js', format: 'esm' },
    ],
    plugins,
  },

  // ── Vue 3 adapter ──
  {
    input: 'src/adapters/vue.js',
    external: ['vue'],
    output: [
      { file: 'dist/vue.cjs.js', format: 'cjs', exports: 'named' },
      { file: 'dist/vue.esm.js', format: 'esm' },
    ],
    plugins,
  },
];
