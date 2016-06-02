/** Created by hhj on 3/31/16. */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import Navigation from '../Navigation'

describe('umistovani Navigation component', () => {
  let vdom
  // let instance

  const shallowRender = (props) => {
    const tree = sd.shallowRender(React.createElement(Navigation, props))

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
