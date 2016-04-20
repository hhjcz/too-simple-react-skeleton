/** Created by hhj on 4/15/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import createStore from '../../app/createStore'
import Connected, { Hriste } from '../Hriste'

describe('app Hriste', () => {

  describe('connected component', () => {
    let vdom
    // let instance

    const shallowRender = (props) => {
      const tree = sd.shallowRender(React.createElement(Connected, props))

      // instance = tree.getMountedInstance()
      vdom = tree.getRenderOutput()
      // console.log(vdom)
    }

    it('should connect props to redux', () => {
      const store = createStore()
      shallowRender({ store })
      expect(typeof vdom.props.store).to.equal('object')
      // expect(typeof vdom.props.dispatch).to.equal('function')
      // expect(typeof vdom.props.actions).to.equal('object')
    })
  })

  describe('inner component', () => {
    let vdom
    // let instance

    const shallowRender = (props) => {
      const tree = sd.shallowRender(React.createElement(Hriste))

      // instance = tree.getMountedInstance()
      vdom = tree.getRenderOutput()
      // console.log(vdom)
    }

    it('should render with default props', () => {
      const store = createStore()
      shallowRender()
      expect(vdom.type).to.equal('div')
      // expect(typeof vdom.props.dispatch).to.equal('function')
      // expect(typeof vdom.props.actions).to.equal('object')
    })

  })
})
