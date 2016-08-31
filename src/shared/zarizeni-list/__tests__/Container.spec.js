/** Created by hhj on 1/4/16. */
/* eslint-disable no-unused-expressions, no-unused-vars, import/no-extraneous-dependencies */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import Container from './../Container'

describe('zarizeni-list Container component', () => {

  const shallowRender = (props) => sd.shallowRender(
    React.createElement(Container, props)
  )

  it('should render with default props', () => {
    const tree = shallowRender()
    expect(tree.type).to.equal('div')
  })

})

