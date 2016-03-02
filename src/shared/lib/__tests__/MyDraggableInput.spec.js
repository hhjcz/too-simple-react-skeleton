/** Created by hhj on 3/2/16. */
import chai, { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'

import MyInput from '../MyDraggableInput'

describe(' MyDraggableInput component', () => {
  let tree
  let vdom
  let instance   // eslint-disable-line no-unused-vars

  const shallowRender = (props) => {
    tree = sd.shallowRender(React.createElement(MyInput, props))

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
