import define from './'
const { expect } = chai

const tmpTagName = ((i = 0) => {
  return () => `tat-${i++}`
})()

describe('@riotjs/custom-elements', function() {
  it('can generate properly the tag options', () => {
    const name = tmpTagName()
    define(name, {
      template: (t, e) => t('<p><!----></p>', [{
        selector: 'p',
        expressions: [{
          type: e.TEXT,
          childNodeIndex: 0,
          evaluate: (s) => s.props.message // eslint-disable-line
        }]
      }]),
      exports: {
        observedAttributes: ['message']
      }
    })

    const el = document.createElement(name)
    document.body.appendChild(el)
    el.setAttribute('message', 'hello')
    expect(el.component.props.message).to.be.equal('hello')
  })

  it('lifecycle events get properly called', () => {
    const name = tmpTagName()
    const onBeforeMount = sinon.spy()
    const onMounted = sinon.spy()
    const onBeforeUpdate = sinon.spy()
    const onUpdated = sinon.spy()
    const onBeforeUnmount = sinon.spy()
    const onUnmounted = sinon.spy()

    define(name, {
      template: (t, e) => t('<p><!----></p>', [{
        selector: 'p',
        expressions: [{
          type: e.TEXT,
          childNodeIndex: 0,
          evaluate: (s) => s.props.message
        }]
      }]),
      exports: {
        onBeforeMount,
        onMounted,
        onBeforeUpdate,
        onUpdated,
        onBeforeUnmount,
        onUnmounted,
        observedAttributes: ['message']
      }
    })

    const el = document.createElement(name)
    document.body.appendChild(el)

    expect(onBeforeMount).to.have.been.calledOnce
    expect(onMounted).to.have.been.calledOnce
    expect(onBeforeUpdate).to.have.not.been.called
    expect(onUpdated).to.have.not.been.called
    expect(onBeforeUnmount).to.have.not.been.called
    expect(onUnmounted).to.have.not.been.called

    el.setAttribute('message', 'bar')

    expect(onBeforeMount).to.have.been.calledOnce
    expect(onMounted).to.have.been.calledOnce
    expect(onBeforeUpdate).to.have.been.calledOnce
    expect(onUpdated).to.have.been.calledOnce
    expect(onBeforeUnmount).to.have.not.been.called
    expect(onUnmounted).to.have.not.been.called

    el.parentNode.removeChild(el)

    expect(onBeforeMount).to.have.been.calledOnce
    expect(onMounted).to.have.been.calledOnce
    expect(onBeforeUpdate).to.have.been.calledOnce
    expect(onUpdated).to.have.been.calledOnce
    expect(onBeforeUnmount).to.have.been.calledOnce
    expect(onUnmounted).to.have.been.calledOnce
  })

  it('custom tag api methods will be properly created', () => {
    const name = tmpTagName()
    define(name, {
      template: (t, e) => t('<p><!----></p>', [{
        selector: 'p',
        expressions: [{
          type: e.TEXT,
          childNodeIndex: 0,
          evaluate: (s) => s.props.message
        }]
      }]),
      exports: {
        onClick() {
          this.foo = 'bar'
        }
      }
    })

    const el = document.createElement(name)
    document.body.appendChild(el)
    expect(el.component.onClick).to.be.ok
  })

  it('css will be properly created via shadow DOM', () => {
    const name = tmpTagName()
    define(name, {
      template: (t, e) => t('<p><!----></p>', [{
        selector: 'p',
        expressions: [{
          type: e.TEXT,
          childNodeIndex: 0,
          evaluate: (s) => s.props.message
        }]
      }]),
      css: ':host { color: red }'
    })

    const el = document.createElement(name)
    document.body.appendChild(el)
    expect(window.getComputedStyle(el).color).to.be.equal('rgb(255, 0, 0)')
  })
})