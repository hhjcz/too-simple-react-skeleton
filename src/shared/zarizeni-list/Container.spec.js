/** Created by hhj on 1/4/16. */

import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'

import createStore from '../app/createStore'
import Container from './Container.jsx'

describe('zarizeni-list Container component', () => {
  let vdom
  let instance  // eslint-disable-line no-unused-vars

  beforeEach(() => {
    const store = createStore()
    const tree = sd.shallowRender(React.createElement(Container, { store }))

    instance = tree.getMountedInstance()
    vdom = tree.getRenderOutput()
    // console.log(instance)
  })

  it('should connect to redux', () => {
    expect(typeof vdom.props.store).to.equal('object');
    expect(typeof vdom.props.actions).to.equal('object');
    expect(typeof vdom.props.dispatch).to.equal('function');
  })

})
