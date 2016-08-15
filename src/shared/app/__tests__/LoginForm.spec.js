/** Created by hhj on 7/13/16. */
/* eslint-disable no-unused-expressions, no-unused-vars, import/no-extraneous-dependencies */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import LoginForm from '../LoginForm'

describe('app LoginForm component', () => {
  let tree

  const shallowRender = (props) => {
    tree = sd.shallowRender(React.createElement(LoginForm, props))
  }

  it('should render with default props', () => {
    shallowRender()
    expect(tree.type).to.equal('div')
  })

})
