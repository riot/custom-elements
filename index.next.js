import {bindingTypes, template as createTemplate, expressionTypes} from '@riotjs/dom-bindings'
import curry from 'curri'

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

// call a lifecycle method only if it exists
const callLifecycleMethod = (context, args, fn) => fn && fn.apply(context, args)

/**
 * Create a new custom element using the riot core components
 * @param   {string} name - custom component tag name
 * @param   {Object} api - custom component api containing lifecycle methods and properties
 * @param   {Object} options - optional options that could be passed to customElements.define
 * @returns {undefined} it's a void method again ¯\_(ツ)_/¯
 */
export default function define(name, api, options) {
  const {
    tag,
    template,
    css,
    observedAttributes,
    props,
    ...rest
  } = api

  // define the new custom element
  return customElements.define(name, class extends HTMLElement {
    constructor() {
      // call the super generic HTMLElement class
      super()
      // create the shadow DOM
      this.shadow = this.attachShadow({ mode: 'open' })

      this.state = {}
      this.props = {
        ...props
      }

      // extend this instance with the tag API
      Object.assign(this,
        tag,
        rest,
        template(createTemplate, expressionTypes, bindingTypes)
      )

      // append the css if necessary
      if (css) this.shadow.appendChild(createStyleNode(css))
    }

    // on element appended callback
    connectedCallback() {
      const execLifecycle = curry(
        callLifecycleMethod
      )(this, [this.props, this.state])

      execLifecycle(this.onBeforeMount)

      this.mount(this.shadow, this)
      execLifecycle(this.onMounted)
    }

    // on element removed
    disconnectedCallback() {
      const execLifecycle = curry(callLifecycleMethod)(this.tag, [this.props, this.state])

      execLifecycle(this.onBeforeUnmount)
      this.unmount()
      execLifecycle(this.onUnmounted)
    }

    // on attribute changed
    attributeChangedCallback(attributeName, oldValue, newValue) {
      if (!this.update) return
      this.props = {
        [attributeName]: newValue,
        ...this.props
      }

      const execLifecycle = curry(
        callLifecycleMethod
      )(this.props, this.state)

      execLifecycle(this.onBeforeUpdate)
      this.update(this)
      execLifecycle(this.onUpdated)
    }

    // component properties to observe
    static get observedAttributes() {
      return observedAttributes || []
    }
  }, options)
}
