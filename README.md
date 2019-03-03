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
import MyComponent from './my-component.riot'
import define from '@riotjs/custom-elements'

define('x-tag', MyComponent)
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
- tag api normally generated via riot compiler
- custom options to pass to `customElements.define` like `{extends: 'button'}` for example
