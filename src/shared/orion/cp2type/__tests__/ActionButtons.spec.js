/** Created by hhj on 6/27/16. */
/* eslint-disable no-unused-expressions, no-unused-vars, import/no-extraneous-dependencies */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import ActionButtons from '../ActionButtons'

describe('orion cp2type ActionButtons component', () => {
  const shallowRender = (props) => sd.shallowRender(React.createElement(ActionButtons, props))

  it('should render with default props', () => {
    const tree = shallowRender()
    expect(tree.type).to.equal('div')
  })

})
