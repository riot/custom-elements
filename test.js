import define from './'
const { expect } = chai

const tmpTagName = ((i = 0) => {
  return () => `tat-${i++}`
})()

describe('@riotjs/custom-elements', function() {
  it('can generate properly the tag options', () => {
    const name = tmpTagName()
    define(name, {
      tmpl: '<p>{ message }</p>',
      data: { message: 'hello' }
    })

    const el = document.createElement(name)
    document.body.appendChild(el)
    expect(el.tag.opts.message).to.be.equal('hello')
  })

  it('lifecycle events get properly called', () => {
    const name = tmpTagName()
    const onBeforeMount = sinon.spy()
    const onMounted = sinon.spy()
    const onBeforeUpdate = sinon.spy()
    const onUpdated = sinon.spy()
    const onBeforeDestroy = sinon.spy()
    const onDestroyed = sinon.spy()

    define(name, {
      tmpl: '<p>{ message }</p>',
      data: { message: 'hello' },
      onBeforeMount,
      onMounted,
      onBeforeUpdate,
      onUpdated,
      onBeforeDestroy,
      onDestroyed,
      props: ['message']
    })

    const el = document.createElement(name)
    document.body.appendChild(el)

    expect(onBeforeMount).to.have.been.calledOnce
    expect(onMounted).to.have.been.calledOnce
    expect(onBeforeUpdate).to.have.not.been.called
    expect(onUpdated).to.have.not.been.called
    expect(onBeforeDestroy).to.have.not.been.called
    expect(onDestroyed).to.have.not.been.called

    el.setAttribute('message', 'bar')

    expect(onBeforeMount).to.have.been.calledOnce
    expect(onMounted).to.have.been.calledOnce
    expect(onBeforeUpdate).to.have.been.calledOnce
    expect(onUpdated).to.have.been.calledOnce
    expect(onBeforeDestroy).to.have.not.been.called
    expect(onDestroyed).to.have.not.been.called

    el.parentNode.removeChild(el)

    expect(onBeforeMount).to.have.been.calledOnce
    expect(onMounted).to.have.been.calledOnce
    expect(onBeforeUpdate).to.have.been.calledOnce
    expect(onUpdated).to.have.been.calledOnce
    expect(onBeforeDestroy).to.have.been.calledOnce
    expect(onDestroyed).to.have.been.calledOnce
  })

  it('custom tag api methods will be properly created', () => {
    const name = tmpTagName()
    define(name, {
      tmpl: '<p>{ message }</p>',
      data: { message: 'hello' },
      onClick() {
        this.foo = 'bar'
      }
    })

    const el = document.createElement(name)
    document.body.appendChild(el)
    expect(el.tag.onClick).to.be.ok
  })

  it('css will be properly created via shadow DOM', () => {
    const name = tmpTagName()
    define(name, {
      tmpl: '<p>{ message }</p>',
      css: ':host { color: red }',
      data: { message: 'hello' }
    })

    const el = document.createElement(name)
    document.body.appendChild(el)
    expect(window.getComputedStyle(el).color).to.be.equal('rgb(255, 0, 0)')
  })
})