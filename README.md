# @riotjs/custom-elements

[![Build Status][travis-image]][travis-url]

[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]

## Usage

```js
import define from '@riotjs/custom-elements'

define('x-tag', {
  css: `
    :host {
      color: red;
      cursor: pointer;
    }
`,
  tmpl: `
  <p onclick="{ onClick }">{message}</p>
`,
  props: ['message'],
  data() {
    return { message: 'Click Me' }
  },
  onClick() {
    this.root.setAttribute('message', 'Ciao')
  },
  onBeforeMount(opts) {
    this.message = opts.message
  },
  onMounted(opts) {
    console.log('created!')
  }
})

```

[travis-image]:https://img.shields.io/travis/riot/custom-elements.svg?style=flat-square
[travis-url]:https://travis-ci.org/riot/custom-elements

[license-image]:http://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
[license-url]:LICENSE

[npm-version-image]:http://img.shields.io/npm/v/@riotjs/custom-elements.svg?style=flat-square
[npm-downloads-image]:http://img.shields.io/npm/dm/@riotjs/custom-elements.svg?style=flat-square
[npm-url]:https://npmjs.org/package/@riotjs/custom-elements

## API

