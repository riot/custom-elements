import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'index.next.js',
  plugins: [
    resolve()
  ],
  output: [
    {
      file: 'index.js',
      name: 'riotCustomElements',
      format: 'umd'
    }
  ]
}
