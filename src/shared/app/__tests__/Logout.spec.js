/** Created by hhj on 7/14/16. */
/* eslint-disable no-unused-expressions, no-unused-vars, import/no-extraneous-dependencies */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import Logout from '../Logout'

describe('app Logout component', () => {
  let tree

  const shallowRender = (props) => {
    tree = sd.shallowRender(React.createElement(Logout, props))
  }

  it('should render with default props', () => {
    shallowRender()
    expect(tree.type).to.equal('div')
  })

})
