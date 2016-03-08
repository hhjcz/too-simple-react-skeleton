/** Created by hhj on 3/2/16. */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'

import MyInput from '../MyDraggableInput'

describe(' MyDraggableInput component', () => {
  let vdom

  const shallowRender = (props) => {
    const tree = sd.shallowRender(React.createElement(MyInput, props))
    // const instance = tree.getMountedInstance()
    vdom = tree.getRenderOutput()
    // console.log(vdom)
  }

  it('should render with default props', () => {
    shallowRender()
    expect(vdom.type).to.equal('div')
    // expect(vdom.props.children.type).to.equal('');
  })

})
