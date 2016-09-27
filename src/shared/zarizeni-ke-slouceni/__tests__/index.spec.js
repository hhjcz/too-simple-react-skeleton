/** Created by hhj on 1/4/16. */
/* eslint-disable no-unused-expressions, no-unused-vars, import/no-extraneous-dependencies */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import { List, Map } from 'immutable'
import createStore from '../../app/createStore'
import Connected from './../index'

describe('zarizeni-ke-slouceni connected Container component (wrapper)', () => {
  let tree
  let store

  beforeEach(() => {
    store = createStore()
    tree = sd.shallowRender(React.createElement(Connected, { store }))
  })

  it('should connect props to redux', () => {
    expect(tree.props.store).to.deep.equal(store)
    expect(typeof tree.props.dispatch).to.equal('function')
    expect(typeof tree.props.actions).to.equal('object')
    expect(typeof tree.props.actions.gotoPage).to.equal('function')
  })

  it('should connect proper sub state to props', () => {
    expect(typeof tree.props.items).to.equal('object')
    expect(tree.props.items).to.be.instanceof(List)
    expect(tree.props.pagination.page).to.be.equal(1)
    expect(tree.props.generalParams).to.be.instanceof(Map)
    expect(tree.props.columns).to.be.instanceof(Map)
  })
})

