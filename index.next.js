import { Tag } from 'riot'
import curry from 'curri'

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
 * Create a new tag instance
 * @param   {Object} options.api - tag api containing its methods, store...
 * @param   {string} options.tmpl - tag template
 * @param   {string} options.name - tag id
 * @param   {Function|Object } options.data - initial tag options
 * @returns {riot.Tag} a new riot.Tag instance
 */
function createTag({element, api, tmpl, name, data}) {
  return new class extends Tag {
    constructor(...args) {
      super(...args)
      Object.assign(this, api)
    }
    get name() { return name }
    get tmpl() { return tmpl }
  }(element, typeof data === 'function' ? data() : data)
}

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
    tmpl,
    css,
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated,
    onBeforeDestroy,
    onDestroyed,
    props,
    data,
    ...rest
  } = api

  // define the new custom element
  return customElements.define(name, class extends HTMLElement {
    constructor() {
      // call the super generic HTMLElement class
      super()
      // create the shadow DOM
      this.shadow = this.attachShadow({ mode: 'open' })

      // append the css if necessary
      if (css) this.shadow.appendChild(createStyleNode(css))
    }

    // on element appended callback
    connectedCallback() {
      // create a new tag instance
      this.tag = createTag({ element: this, tmpl, name, api: rest, data })

      const execLifecycle = curry(
        callLifecycleMethod
      )(this.tag, [this.tag.opts])

      // move the tag root html into the shadow DOM
      moveChildren(this, this.shadow)

      execLifecycle(onBeforeMount)
      this.tag.mount()
      execLifecycle(onMounted)
    }

    // on element removed
    disconnectedCallback() {
      const execLifecycle = curry(callLifecycleMethod)(this.tag, [])

      execLifecycle(onBeforeDestroy)
      this.tag.unmount()
      execLifecycle(onDestroyed)
    }

    // on attribute changed
    attributeChangedCallback(attributeName, oldValue, newValue) {
      if (!this.tag) return
      const execLifecycle = curry(
        callLifecycleMethod
      )(this.tag, [attributeName, oldValue, newValue])

      execLifecycle(onBeforeUpdate)
      this.tag.update({ [attributeName]: newValue })
      execLifecycle(onUpdated)
    }

    // component properties to observe
    static get observedAttributes() {
      return props || []
    }
  }, options)
}
