/** Created by hhj on 1/21/16. */
import chai, { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'

import { Filter } from '../filter'
import HeaderFilter from '../HeaderFilter'

describe('zarizeni-list HeaderFilter component', () => {
  let tree
  let vdom
  let instance   // eslint-disable-line no-unused-vars
  let spyOnChange

  beforeEach(() => {
    spyOnChange = chai.spy()
    tree = sd.shallowRender(React.createElement(HeaderFilter, {
      column: { name: 'someColumn' },
      debounce: 0,
      onFilterChange: spyOnChange
    }))

    instance = tree.getMountedInstance()
    vdom = tree.getRenderOutput()
    // console.log(vdom.props.children[1].props.children)
  })

  it('should render', () => {
    expect(vdom.type).to.equal('div')
    expect(vdom.props.children[0].type).to.equal('div');
  })

  it('should call input onChange handler', () => {
    tree.fillField('#filterInput', 'someFilterValue')
    expect(spyOnChange).to.be.called.once.with(new Filter({
      name: 'someColumn', value: 'someFilterValue'
    }))
  })

})
