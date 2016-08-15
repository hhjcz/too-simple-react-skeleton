/** Created by hhj on 5/16/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import Bunka from '../Bunka'

describe('lib tabulka Bunka component', () => {
  let vdom
  let tree
  // let instance

  const shallowRender = (props) => {
    tree = sd.shallowRender(React.createElement(Bunka, props))

    // instance = tree.getMountedInstance()
    vdom = tree.getRenderOutput()
    // console.log(vdom)
  }

  it('should render with default props', () => {
    shallowRender()
    expect(vdom.type).to.equal('div')
    // expect(vdom.props.children.type).to.equal('');
  })

  it('should render content with column render callback', () => {
    shallowRender({
      column: { render: model => `Some ${model.caption} in column` },
      model: { caption: 'model-caption' }
    })
    expect(tree.props.children).to.be.equal('Some model-caption in column')
  })

})
