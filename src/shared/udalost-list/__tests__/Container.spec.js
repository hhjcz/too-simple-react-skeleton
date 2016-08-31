/** Created by hhj on 1/4/16. */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import { Map } from 'immutable'
import Container from './../Container'

describe('udalost-list Container component', () => {
  let tree

  beforeEach(() => {
    tree = sd.shallowRender(React.createElement(Container, { columns: Map() }))
  })

  it('should render', () => {
    expect(tree.type).to.equal('div')
  })

})
