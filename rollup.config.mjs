import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import serve from 'rollup-plugin-serve';

const isProduction = process.env.BUILD === 'production';
const isWatch = process.env.ROLLUP_WATCH === 'true';

const outputFile = 'choreboard-ha-card.js';

const plugins = [
  resolve({
    browser: true,
  }),
  commonjs(),
  json(),
  typescript({
    declaration: false,
  }),
];

if (isProduction) {
  plugins.push(
    terser({
      format: {
        comments: false,
      },
    })
  );
}

if (isWatch) {
  plugins.push(
    serve({
      contentBase: ['dist'],
      host: '0.0.0.0',
      port: 4000,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
  );
}

export default {
  input: 'src/main.ts',
  output: {
    file: `dist/${outputFile}`,
    format: 'es',
    sourcemap: true, // Always generate source maps for debugging
    inlineDynamicImports: true,
  },
  plugins,
  watch: {
    clearScreen: false,
  },
};
