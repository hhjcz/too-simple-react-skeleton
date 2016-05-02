/** Created by hhj on 4/21/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import SeznamPortu from '../SeznamPortu'

describe('umistovani SeznamPortu component', () => {
  let vdom
  // let instance

  const shallowRender = (props) => {
    const tree = sd.shallowRender(React.createElement(SeznamPortu, props))

    // instance = tree.getMountedInstance()
    vdom = tree.getRenderOutput()
    // console.log(vdom)
  }

  it('should render with default props', () => {
    shallowRender()
    expect(vdom.type).to.equal('div')
    // expect(vdom.props.children.type).to.equal('');
  })

})
