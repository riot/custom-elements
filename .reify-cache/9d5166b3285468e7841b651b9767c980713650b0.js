"use strict";var assert;module.link('assert',{default(v){assert=v}},0);var define;module.link('./',{default(v){define=v}},1);


describe('@riotjs/custom-elements', function() {
  it('it can render tag options', () => {
    define('x-tag', {
      tmpl: '<p>{ message }</p>',
      data: { message: 'hello' }
    })

    const tag = document.createElement('x-tag')
    document.body.appendChild(tag)
    const node = document.querySelector('x-tag')
    console.log(node) // eslint-disable-line

    assert(node.querySelector('p').innerHTML === 'hello')
  })
})