/** Created by hhj on 1/14/16. */

import { expect } from 'chai'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import sd from 'skin-deep'

import { Pagination } from '../pagination'
import Paginator from '../Paginator'

describe('zarizeni-list Paginator component (testing using shallow render)', () => {
  let vdom
  let instance   // eslint-disable-line no-unused-vars

  beforeEach(() => {
    const tree = sd.shallowRender(React.createElement(Paginator, { pagination: {} }))

    instance = tree.getMountedInstance()
    vdom = tree.getRenderOutput()
    // console.log(vdom.props.children[0].props.children[0].props.children.type.displayName)
  })

  it('should render', () => {
    expect(vdom.type).to.equal('div')
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
