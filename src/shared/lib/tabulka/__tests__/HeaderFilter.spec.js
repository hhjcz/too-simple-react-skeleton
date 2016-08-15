/** Created by hhj on 1/21/16. */
import { expect } from 'chai'
import sinon from 'sinon'
import React from 'react'
import sd from 'skin-deep'

import { Filter } from '../../../app/models/Filter'
import HeaderFilter from '../HeaderFilter'

describe('lib tabulka HeaderFilter component', () => {
  let tree
  let vdom
  let instance   // eslint-disable-line no-unused-vars
  let spyOnChange

  beforeEach(() => {
    spyOnChange = sinon.spy()
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
    expect(spyOnChange).to.have.been.calledOnce
    expect(spyOnChange).to.have.been.calledWith(new Filter({
      name: 'someColumn', value: 'someFilterValue'
    }))
  })

})
