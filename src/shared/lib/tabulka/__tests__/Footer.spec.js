/** Created by hhj on 8/12/16. */
/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import Footer from '../Footer'

describe.only('tabulka Footer component', () => {
  let tree
  let vdom
  let spyChange
  // let instance

  const shallowRender = (props) => {
    spyChange = chai.spy()
    tree = sd.shallowRender(React.createElement(Footer, props))

    // instance = tree.getMountedInstance()
    vdom = tree.getRenderOutput()
    // console.log(vdom)
  }

  it('should render with default props', () => {
    shallowRender()
    expect(vdom.type).to.equal('div')
    // expect(vdom.props.children.type).to.equal('');
  })

  it('should handle change of perPage input', () => {
    shallowRender({ onRowCountChange: spyChange })
    const perPageInput = tree.subTree('#rowCountInput').getRenderOutput()
    perPageInput.props.onChange({ target: { value: '66' } })
    console.log('Called')
    expect(spyChange).to.be.called.once.with(66)
  })

  // it('should call perPage change handler', () => {
  //   tree.fillField('#perPageInput', '77')
  //   expect(spyChange).to.be.called.once.with(77)
  // })

  // it('should set input style to error', () => {
  //   tree = sd.shallowRender(React.createElement(Paginator, { pagination: { perPage: 'abc' } }))
  //   const perPageFormGroup = tree.getRenderOutput().props.children.props.children[2].props.children
  //   expect(perPageFormGroup.props.validationState).to.equal('error')
  // }

})
