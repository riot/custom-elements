# @riotjs/custom-elements

[![Riot.js custom elements logo](https://raw.githubusercontent.com/riot/branding/main/custom-elements/custom-elements-horizontal.svg)](https://github.com/riot/custom-elements/)

Simple API to create vanilla custom elements with riot

**This module is highly experimental, and it's not meant to be used in production yet!**

:construction::construction::construction:

[![Build Status][ci-image]][ci-url]
[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]

## Demos

- [Simple Demo](https://codesandbox.io/p/sandbox/riot-custom-elements-demo-forked-xqw2sq)


## Usage

```js
import MyComponent from './my-component.riot'
import define from '@riotjs/custom-elements'

define('x-tag', MyComponent)
```

Notice that in order to update the component properties via attribute you will need to rely on the [`observedAttributes`](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) array

```html

<my-component>
  <p>{props.message}</p>
  <script>
    export default {
      // the message property will be automatically updated anytime the DOM `message` attribute will change
      observedAttributes: ['message']
    }
  </script>
</my-component>
```


[ci-image]:https://img.shields.io/github/actions/workflow/status/riot/custom-elements/test.yml?style=flat-square
[ci-url]:https://github.com/riot/custom-elements/actions

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
