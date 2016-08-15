/** Created by hhj on 4/21/16. */
/* eslint-disable no-unused-expressions, no-unused-vars, import/no-extraneous-dependencies */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import SeznamPortu from '../SeznamPortu'

describe('umistovani SeznamPortu component', () => {
  const shallowRender = (props) => sd.shallowRender(React.createElement(SeznamPortu, props))

  it('should render with default props', () => {
    const tree = shallowRender()
    expect(tree.type).to.equal('div')
    // expect(vdom.props.children.type).to.equal('');
  })

})
