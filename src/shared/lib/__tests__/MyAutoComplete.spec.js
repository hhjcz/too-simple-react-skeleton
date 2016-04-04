/** Created by hhj on 4/4/16. */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import MyAutoComplete from '../MyAutoComplete'

describe('lib MyAutoComplete component', () => {
  let vdom
  // let instance

  const shallowRender = (props) => {
    const tree = sd.shallowRender(React.createElement(MyAutoComplete, props))

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
