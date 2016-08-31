/** Created by hhj on 4/14/16. */
/* eslint-disable no-unused-expressions, no-unused-vars, import/no-extraneous-dependencies */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import { List, Map } from 'immutable'
import createStore from '../../../app/createStore'
import Container from '../Container'

describe('zarizeni-detail Container component', () => {
  let tree

  beforeEach(() => {
    tree = sd.shallowRender(React.createElement(Container))
  })

  it('should render', () => {
    expect(tree.type).to.equal('div')
  })

})
