/** Created by hhj on 8/12/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import MyCheckbox from '../MyCheckbox'

describe('lib MyCheckbox component', () => {
  let vdom
  // let instance

  const shallowRender = (props) => {
    const tree = sd.shallowRender(React.createElement(MyCheckbox, props))

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
