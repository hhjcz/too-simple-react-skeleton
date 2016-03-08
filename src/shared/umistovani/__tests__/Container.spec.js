/** Created by hhj on 1/4/16. */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'

import createStore from '../../app/createStore'
import Connected, { Container } from './../Container'

describe('umistovani connected Container component', () => {
  let vdom

  beforeEach(() => {
    const store = createStore()
    const tree = sd.shallowRender(React.createElement(Connected, { store }))

    // const instance = tree.getMountedInstance()
    vdom = tree.getRenderOutput()
  })

  it('should connect props to redux', () => {
    expect(typeof vdom.props.store).to.equal('object')
    // expect(typeof vdom.props.dispatch).to.equal('function')
    // expect(typeof vdom.props.actions).to.equal('object')
  })

  it('should connect proper sub state to props', () => {
    expect(typeof vdom.props.umisteni).to.equal('object')
    // expect(vdom.props.umisteni).to.be.instanceof(List)
  })

})

describe('umistovani Container component', () => {
  let vdom

  beforeEach(() => {
    const store = createStore()
    const location = { query: {} }
    const tree = sd.shallowRender(React.createElement(Container, { store, location }))

    // const instance = tree.getMountedInstance()
    vdom = tree.getRenderOutput()
  })

  it('should render', () => {
    expect(vdom.type).to.equal('div')
  })

})
