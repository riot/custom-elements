import {component} from 'riot'
import {defineProperty} from '@riotjs/util/objects'

/**
 * Create the style node to inject into the shadow DOM
 * @param   {string} css - component css
 * @returns {HTMLElement} style DOM node
 */
function createStyleNode(css) {
  const style = document.createElement('style')
  style.textContent = css

  return style
}

/**
 * Move all the child nodes from a source tag to another
 * @param   {HTMLElement} source - source node
 * @param   {HTMLElement} target - target node
 * @returns {undefined} it's a void method ¯\_(ツ)_/¯
 */
function moveChildren(source, target) {
  if (source.firstChild) {
    target.appendChild(source.firstChild)
    moveChildren(source, target)
  }
}

/**
 * Create a new custom element Class using the riot core components
 * @param   {Object} api - custom component api containing lifecycle methods and properties
 * @returns {Class} Class extends HTMLElement
 */
export function createElementClass(api) {
  const {
    css,
    exports,
    template
  } = api

  const tagImplementation = exports || {}

  return class extends HTMLElement {
    constructor() {
      // call the super generic HTMLElement class
      super()
      // create the shadow DOM
      this.shadow = this.attachShadow({ mode: 'open' })
      this.componentFactory = component({
        exports: tagImplementation,
        template
      })

      // append the css if necessary
      if (css) this.shadow.appendChild(createStyleNode(css))
    }

    // on element appended callback
    connectedCallback() {
      this.component = this.componentFactory(this)

      // move the tag root html into the shadow DOM
      moveChildren(this.component.root, this.shadow)
    }

    // on attribute changed
    attributeChangedCallback(attributeName, oldValue, newValue) {
      if (!this.component) return

      defineProperty(this.component, 'props', {
        ...this.component.props,
        [attributeName]: newValue
      })
      this.component.update()
    }

    // on element removed
    disconnectedCallback() {
      this.component.unmount()
    }

    // component properties to observe
    static get observedAttributes() {
      return tagImplementation.observedAttributes || []
    }
  }
}

/**
 * Define a new custom element using the riot core components
 * @param   {string} name - custom component tag name
 * @param   {Object} api - custom component api containing lifecycle methods and properties
 * @param   {Object} options - optional options that could be passed to customElements.define
 * @returns {undefined} it's a void method again ¯\_(ツ)_/¯
 */
export default function define(name, api, options) {
  // define the new custom element
  return customElements.define(name, createElementClass(api), options)
}
