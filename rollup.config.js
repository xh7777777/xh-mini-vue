import babel from 'rollup-plugin-babel';
import typescript from '@rollup/plugin-typescript';
export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/mini-vue.js',
    format: 'umd',
    name: 'MiniVue',
    sourcemap: true,
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    typescript()
  ]
}
