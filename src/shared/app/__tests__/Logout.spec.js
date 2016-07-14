/** Created by hhj on 7/14/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import Logout from '../Logout'

describe('app Logout component', () => {
  let vdom
  // let instance

  const shallowRender = (props) => {
    const tree = sd.shallowRender(React.createElement(Logout, props))

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
