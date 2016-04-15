/** Created by hhj on 4/14/16. */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import { List, Map } from 'immutable'
import createStore from '../../app/createStore'
import Connected, { Container } from './../Container'

describe('zarizeni-detail', () => {

  describe('connected Container component (wrapper)', () => {
    let vdom
    // let instance  // eslint-disable-line no-unused-vars

    beforeEach(() => {
      const store = createStore()
      const tree = sd.shallowRender(React.createElement(Connected, { store }))

      // instance = tree.getMountedInstance()
      vdom = tree.getRenderOutput()
      // console.log(vdom.props.children)
    })

    it('should connect props to redux', () => {
      expect(typeof vdom.props.store).to.equal('object')
      expect(typeof vdom.props.dispatch).to.equal('function')
      expect(typeof vdom.props.actions).to.equal('object')
      expect(typeof vdom.props.actions.gotoPage).to.equal('function')
    })

    it('should connect proper sub state to props', () => {
      expect(typeof vdom.props.items).to.equal('object')
      expect(vdom.props.items).to.be.instanceof(List)
      expect(vdom.props.generalParams).to.be.instanceof(Map)
    })

  })

  describe('Container component', () => {
    let vdom
    // let instance  // eslint-disable-line no-unused-vars

    beforeEach(() => {
      const store = createStore()
      const tree = sd.shallowRender(
        React.createElement(Container)
      )

      // instance = tree.getMountedInstance()
      vdom = tree.getRenderOutput()
      // console.log(vdom.props.children)
    })

    it('should render', () => {
      expect(vdom.type).to.equal('div')
    })

  })
})
