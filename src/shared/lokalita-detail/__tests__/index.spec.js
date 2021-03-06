/** Created by hhj on 4/14/16. */
/* eslint-disable no-unused-expressions, no-unused-vars, import/no-extraneous-dependencies */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import { List, Map } from 'immutable'
import createStore from '../../app/createStore'
import Connected from './../index'

describe('lokalita-detail connected Container component (wrapper)', () => {
  let tree
  const store = createStore()

  beforeEach(() => {
    tree = sd.shallowRender(React.createElement(Connected, { store }))
  })

  it('should connect props to redux', () => {
    expect(tree.props.store).to.equal(store)
    expect(typeof tree.props.dispatch).to.equal('function')
    expect(typeof tree.props.actions).to.equal('object')
    expect(typeof tree.props.actions.lokalita.fetchOne).to.equal('function')
  })

  it('should connect proper sub state to props', () => {
    expect(typeof tree.props.lokalitaResource.items).to.equal('object')
    expect(tree.props.lokalitaResource.items).to.be.instanceof(List)
    expect(tree.props.lokalitaResource.generalParams).to.be.instanceof(Map)
  })

})

