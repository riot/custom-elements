import { nodeResolve } from '@rollup/plugin-node-resolve'

const globals = {
  riot: 'riot',
}

export default {
  input: 'src/index.js',
  external: ['riot'],
  plugins: [
    nodeResolve()
  ],
  output: [
    {
      file: 'index.cjs',
      name: 'riotCustomElements',
      format: 'umd',
      globals,
    },
    {
      name: 'riotCustomElements',
      file: 'index.js',
      format: 'es',
      globals,
    },
  ]
}
