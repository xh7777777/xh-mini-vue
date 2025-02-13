import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/mini-vue.js',
    format: 'umd',
    name: 'MiniVue',
    sourcemap: true
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    })
  ]
}
