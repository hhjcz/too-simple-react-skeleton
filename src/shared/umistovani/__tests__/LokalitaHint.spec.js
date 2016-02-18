/** Created by hhj on 2/18/16. */
import chai, { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'

import LokalitaHint from '../LokalitaHint'

describe('umistovani LokalitaHint component', () => {
  let tree
  let vdom
  let instance   // eslint-disable-line no-unused-vars

  const shallowRender = (props) => {
    tree = sd.shallowRender(React.createElement(LokalitaHint, props))

    instance = tree.getMountedInstance()
    vdom = tree.getRenderOutput()
    // console.log(vdom)
  }

  it('should render with default props', () => {
    shallowRender()
    expect(vdom.type).to.equal('div')
    // expect(vdom.props.children.type).to.equal('');
  })

})
