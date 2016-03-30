/** Created by hhj on 3/30/16. */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import FetchIndicator from '../FetchIndicator'

describe('umistovani FetchIndicator component', () => {
  let vdom
  // let instance

  const shallowRender = (props) => {
    const tree = sd.shallowRender(React.createElement(FetchIndicator, props))

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
