/** Created by hhj on 3/15/16. */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import ZarizeniInfo from '../ZarizeniInfo'

describe('umistovani ZarizeniInfo component', () => {
  let vdom
  // let instance

  const shallowRender = (props) => {
    const tree = sd.shallowRender(React.createElement(ZarizeniInfo, props))

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