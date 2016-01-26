/** Created by hhj on 1/14/16. */
import chai, { expect } from 'chai'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import sd from 'skin-deep'

import { Pagination } from '../pagination'
import Paginator from '../Paginator'

describe('zarizeni-list Paginator component (testing using shallow render)', () => {
  let tree
  let vdom
  let instance   // eslint-disable-line no-unused-vars
  let spyChange

  beforeEach(() => {
    spyChange = chai.spy()
    tree = sd.shallowRender(React.createElement(Paginator, {
      pagination: { page: 66, perPage: 666 },
      onPerPageChange: spyChange,
      debounce: 0,
    }))

    instance = tree.getMountedInstance()
    vdom = tree.getRenderOutput()
  })

  it('should render', () => {
    expect(vdom.type).to.equal('div')
  })

  it('should handle change of perPage input', () => {
    const perPageInput = vdom.props.children.props.children[2].props.children
    perPageInput.props.onChange({ target: { value: '66' } })
    expect(spyChange).to.be.called.once.with(66)
  })

  it('should call perPage change handler', () => {
    tree.fillField('#perPageInput', '77')
    expect(spyChange).to.be.called.once.with(77)
  })

  it('should set input style to error', () => {
    tree = sd.shallowRender(React.createElement(Paginator, { pagination: { perPage: 'abc' } }))
    const perPageInput = tree.getRenderOutput().props.children.props.children[2].props.children
    expect(perPageInput.props.bsStyle).to.equal('error')
  })

})

describe('zarizeni-list Paginator component (testing using real DOM)', () => {
  beforeEach(() => {
    this.component = TestUtils.renderIntoDocument(
      <Paginator
        pagination={new Pagination}
        onPageChange={ function(page) {console.log('page: ', page)}}
        onPerPageChange={ function(perPage) {console.log(perPage)}}
      />
    )
    this.renderedDOM = () => ReactDOM.findDOMNode(this.component)
    console.log(this.component)
  })

  // it('should render', () => {
  // })

})
