module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],
    files: [
      'node_modules/chai/chai.js',
      'node_modules/sinon/pkg/sinon.js',
      'node_modules/sinon-chai/lib/sinon-chai.js',
      'test.js'
    ],
    browsers: ['ChromeHeadless'],
    reporters: ['progress'],
    preprocessors: {
      'test.js': ['rollup']
    },
    rollupPreprocessor: {
      plugins: [require('rollup-plugin-node-resolve')({
        jsnext: true
      })],
      sourcemap: 'inline',
      output: {
        format: 'iife',
        name: 'riotCustomElements'
      }
    },
    client: {
      mocha: {
        reporter: 'html'
      }
    },

    singleRun: true
  })
}
