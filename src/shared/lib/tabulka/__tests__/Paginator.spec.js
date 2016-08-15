/** Created by hhj on 1/14/16. */
import { expect } from 'chai'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import sd from 'skin-deep'

import { Pagination } from '../../../app/models/Pagination'
import Paginator from '../Paginator'

describe('lib tabulka Paginator component (testing using shallow render)', () => {
  let tree
  let vdom
  let instance   // eslint-disable-line no-unused-vars
  let spyChange

  beforeEach(() => {
    tree = sd.shallowRender(React.createElement(Paginator, {
      pagination: { page: 66, perPage: 666 },
      debounce: 0,
    }))

    instance = tree.getMountedInstance()
    vdom = tree.getRenderOutput()
  })

  it('should render', () => {
    expect(vdom.type).to.equal('div')
  })

})

describe('lib tabulka Paginator component (testing using real DOM)', () => {
  beforeEach(() => {
    this.component = TestUtils.renderIntoDocument(
      <Paginator
        pagination={new Pagination()}
        onPageChange={function(page) { console.log('page: ', page) }}
        onPerPageChange={function(perPage) { console.log(perPage) }}
      />
    )
    this.renderedDOM = () => ReactDOM.findDOMNode(this.component)
    console.log(this.component)
  })

  // it('should render', () => {
  // })

})
