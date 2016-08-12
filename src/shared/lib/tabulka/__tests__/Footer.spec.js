/** Created by hhj on 8/12/16. */
/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import Footer from '../Footer'

describe('tabulka Footer component', () => {
  let tree
  let vdom
  // let instance

  const shallowRender = (props) => {
    tree = sd.shallowRender(React.createElement(Footer, props))
    // instance = tree.getMountedInstance()
    vdom = tree.getRenderOutput()
    // console.log(vdom)
  }

  it('should render with default props', () => {
    shallowRender()
    // expect(vdom.props.children.type).to.equal('');
  })

  it('should handle change of rowCount input', () => {
    const spyChange = chai.spy()
    shallowRender({ onRowCountChange: spyChange, debounce: 1 })
    const perPageInput = tree.subTree('#rowCountInput').getRenderOutput()
    return perPageInput.props.onChange({ target: { value: '66' } }).then(value => {
      expect(spyChange).to.be.called.once.with(66)
    })
  })

  it('should call rowCount change handler', () => {
    const spyChange = chai.spy()
    shallowRender({ onRowCountChange: spyChange, debounce: 0 })
    tree.fillField('#rowCountInput', '77')
    expect(spyChange).to.be.called.once.with(77)
  })

  it('should set input style to error', () => {
    shallowRender({ debounce: 0, rowCount: 'abc' })
    const rowCountFormGroup = tree.subTree('#rowCountFG').getRenderOutput()
    expect(rowCountFormGroup.props.validationState).to.equal('error')
  })

})
