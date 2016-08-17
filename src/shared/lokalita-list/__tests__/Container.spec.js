/** Created by hhj on 1/4/16. */
/* eslint-disable no-unused-expressions, no-unused-vars, import/no-extraneous-dependencies */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import { List, Map } from 'immutable'
import createStore from '../../app/createStore'
import Connected, { Container } from './../Container'
import { Pagination } from '../../lib/Pagination'

describe('lokalita-list', () => {
  describe('connected Container component (wrapper)', () => {
    let tree
    const store = createStore()

    beforeEach(() => {
      const pagination = new Pagination()
      tree = sd.shallowRender(React.createElement(Connected, { store, pagination }))
    })

    it('should connect props to redux', () => {
      expect(tree.props.store).to.equal(store)
      expect(typeof tree.props.dispatch).to.equal('function')
      expect(typeof tree.props.actions).to.equal('object')
      expect(typeof tree.props.actions.gotoPage).to.equal('function')
    })

    it('should connect proper sub state to props', () => {
      expect(typeof tree.props.items).to.equal('object')
      expect(tree.props.items).to.be.instanceof(List)
      expect(tree.props.pagination).to.be.instanceof(Pagination)
      expect(tree.props.generalParams).to.be.instanceof(Map)
      expect(tree.props.columns).to.be.instanceof(Map)
    })

  })

  describe('Container component', () => {
    let tree

    beforeEach(() => {
      tree = sd.shallowRender(React.createElement(Container, { columns: Map() }))
    })

    it('should render', () => {
      expect(tree.type).to.equal('div')
    })

  })

})
