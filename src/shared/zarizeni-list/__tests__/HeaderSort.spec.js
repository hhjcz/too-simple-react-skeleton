/** Created by hhj on 4/8/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import HeaderSort from '../HeaderSort'

describe('zarizeni-list HeaderSort component', () => {
  let vdom
  // let instance

  const shallowRender = (props) => {
    const tree = sd.shallowRender(React.createElement(HeaderSort, props))

    // instance = tree.getMountedInstance()
    vdom = tree.getRenderOutput()
    // console.log(vdom)
  }

  it('should render with default props', () => {
    shallowRender()
    expect(vdom).to.be.null
    // expect(vdom.props.children.type).to.equal('');
  })

  it('should render when column sortable', () => {
    shallowRender({ column: { sortable: true } })
    expect(vdom.type).to.equal('div')
  })

  it('should render when column sortable', () => {
    shallowRender({ column: { sortable: false } })
    expect(vdom).to.be.null
  })

})
