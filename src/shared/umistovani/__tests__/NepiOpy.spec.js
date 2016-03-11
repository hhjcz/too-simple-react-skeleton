/** Created by hhj on 3/11/16. */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import NepiOpy from '../NepiOpy'
import { NepiOpyFactory } from '../../app/models/NepiOpy'

describe('umistovani NepiOpy component', () => {
  let vdom
  // let instance

  const shallowRender = (props) => {
    const tree = sd.shallowRender(React.createElement(NepiOpy, props))

    // instance = tree.getMountedInstance()
    vdom = tree.getRenderOutput()
    // console.log(vdom)
  }

  it('should render with default props', () => {
    shallowRender()
    expect(vdom.type).to.equal('div')
    // expect(vdom.props.children.type).to.equal('');
  })

  it('should render with actual props', () => {
    shallowRender({ nepiOpy: NepiOpyFactory([{ ixop: 66 }, { ixop: 666 }]) })
    expect(vdom.type).to.equal('div')
    // expect(vdom.props.children.type).to.equal('');
  })

})
