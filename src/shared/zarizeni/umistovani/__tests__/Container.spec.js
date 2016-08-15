/** Created by hhj on 1/4/16. */
/* eslint-disable no-unused-expressions, no-unused-vars, import/no-extraneous-dependencies */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import createStore from '../../../app/createStore'
import Connected, { Container } from './../Container'

describe('umistovani', () => {

  describe('connected Container component (wrapper)', () => {
    let tree
    const store = createStore()

    beforeEach(() => {
      tree = sd.shallowRender(React.createElement(Connected, { store }))
    })

    it('should connect props to redux', () => {
      expect(tree.props.store).to.deep.equal(store)
    })

    it('should connect proper sub state to props', () => {
      expect(typeof tree.props.zarizeniResource).to.equal('object')
      expect(typeof tree.props.umisteniResource).to.equal('object')
      expect(typeof tree.props.akrloksResource).to.equal('object')
    })

  })

  describe('Container component', () => {
    let tree
    const store = createStore()

    beforeEach(() => {
      const location = { query: {} }
      tree = sd.shallowRender(React.createElement(Container, { store, location }))
    })

    it('should render', () => {
      expect(tree.type).to.equal('div')
    })

  })

})
