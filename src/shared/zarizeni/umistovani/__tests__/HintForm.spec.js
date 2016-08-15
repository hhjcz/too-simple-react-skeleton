/** Created by hhj on 2/18/16. */
/* eslint-disable no-unused-expressions, no-unused-vars, import/no-extraneous-dependencies */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import HintForm from '../HintForm'

describe('umistovani HintForm component', () => {
  const shallowRender = (props) => sd.shallowRender(React.createElement(HintForm, props))

  it('should render with default props', () => {
    const tree = shallowRender()
    expect(tree.type).to.equal('div')
  })

})
