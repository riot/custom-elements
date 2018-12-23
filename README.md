# @riotjs/custom-elements

Simple API to create vanilla custom elements with riot

:construction::construction::construction:

**This module is highly experimental and it's not meant to be used in production yet!**

:construction::construction::construction:

[![Build Status][travis-image]][travis-url]

[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]

## Demos

- [simple clickable paragraph](https://codesandbox.io/s/v8yyyz4x8y)
- [slotting](https://codesandbox.io/s/91k751n3n4)


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
  // attributes that should be watched
  props: ['message'],

  // initial data AKA opts
  data() {
    return { message: 'Click Me' }
  },
  onClick() {
    this.root.setAttribute('message', 'Ciao')
  },
  onBeforeMount() {
    console.log('before mount')
  },
  onMounted() {
    console.log('mounted!')
  },
  onBeforeUpdate() {
    console.log('watched attribute was changed!')
  },
  onUpdated() {
    console.log('watched attribute was changed and the tag was updated!')
  },
  onBeforeDestroy() {
    console.log('before unmounting the tag')
  },
  onDestroyed() {
    console.log('tag unmounted')
  },
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

This module exports only a single factory function that is a wrapper around the native `customElements.define`. The `define` function accepts only 3 parameters:

- tag name
- tag api like its lifecycle methods or callbacks
- custom options to pass to `customElements.define` like `{extends: 'button'}` for example
