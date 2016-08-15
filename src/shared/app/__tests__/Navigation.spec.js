/** Created by hhj on 3/29/16. */
/* eslint-disable no-unused-expressions, no-unused-vars, import/no-extraneous-dependencies */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import Navigation from '../Navigation'

describe('app Navigation component', () => {
  let tree

  const shallowRender = (props) => {
    tree = sd.shallowRender(React.createElement(Navigation, props))
  }

  it('should render with default props', () => {
    shallowRender()
    expect(tree.type.displayName).to.equal('Uncontrolled(Navbar)')
  })

})
