/** Created by hhj on 4/15/16. */
/* eslint-disable no-unused-expressions, no-unused-vars, import/no-extraneous-dependencies */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import createStore from '../../app/createStore'
import Connected, { Hriste } from '../Hriste'

describe('app Hriste', () => {

  describe('connected component', () => {
    let tree
    // let instance

    const shallowRender = (props) => {
      tree = sd.shallowRender(React.createElement(Connected, props))
    }

    it('should connect props to redux', () => {
      const store = createStore()
      shallowRender({ store })
      expect(typeof tree.props.store).to.equal('object')
      // expect(typeof vdom.props.dispatch).to.equal('function')
      // expect(typeof vdom.props.actions).to.equal('object')
    })
  })

  describe('inner component', () => {
    let tree
    // let instance

    const shallowRender = () => {
      tree = sd.shallowRender(React.createElement(Hriste))
    }

    it('should render with default props', () => {
      createStore()
      shallowRender()
      expect(tree.type).to.equal('div')
      // expect(typeof vdom.props.dispatch).to.equal('function')
      // expect(typeof vdom.props.actions).to.equal('object')
    })

  })
})
