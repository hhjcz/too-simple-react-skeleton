/** Created by hhj on 4/25/16. */
/* eslint-disable no-unused-expressions, no-unused-vars, import/no-extraneous-dependencies */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import NetvisionZarizeni from '../NetvisionZarizeni'

describe('zarizeni NetvisionZarizeni component', () => {
  let tree

  const shallowRender = (props) => {
    tree = sd.shallowRender(React.createElement(NetvisionZarizeni, props))
  }

  it('should render with default props', () => {
    shallowRender()
    expect(tree.type).to.equal('div')
  })

})
