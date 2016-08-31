/** Created by hhj on 1/4/16. */
/* eslint-disable no-unused-expressions, no-unused-vars, import/no-extraneous-dependencies */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import createStore from '../../../app/createStore'
import Container from './../Container'

describe('umistovani Container component', () => {
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
