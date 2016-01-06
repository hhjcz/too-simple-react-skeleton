/** Created by hhj on 1/4/16. */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import { List } from 'immutable'

import createStore from '../../app/createStore'
import Container from './../Container'
import { Pagination } from '../pagination'

describe('zarizeni-list Container component', () => {
  let vdom
  let instance  // eslint-disable-line no-unused-vars

  beforeEach(() => {
    const store = createStore()
    const tree = sd.shallowRender(React.createElement(Container, { store }))

    instance = tree.getMountedInstance()
    vdom = tree.getRenderOutput()
    // console.log(vdom.props.actions)
  })

  it('should connect props to redux', () => {
    expect(typeof vdom.props.store).to.equal('object')
    expect(typeof vdom.props.dispatch).to.equal('function')
    expect(typeof vdom.props.actions).to.equal('object')
    expect(typeof vdom.props.actions.receiveList).to.equal('function')
  })

  it('should connect proper sub state to props', () => {
    expect(typeof vdom.props.seznamZarizeni).to.equal('object')
    expect(vdom.props.seznamZarizeni).to.be.instanceof(List)
    expect(vdom.props.pagination).to.be.instanceof(Pagination)
  })

})
