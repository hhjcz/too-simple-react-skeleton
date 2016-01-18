/** Created by hhj on 1/15/16. */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'

import Header from '../Header'
import { Sort } from '../sort'
import { columns } from '../Column.jsx'

describe('zarizeni-list Header component', () => {
  let vdom
  let instance   // eslint-disable-line no-unused-vars

  beforeEach(() => {
    const tree = sd.shallowRender(React.createElement(Header, { columns, sort: new Sort() }))

    instance = tree.getMountedInstance()
    vdom = tree.getRenderOutput()
    // console.log(vdom)
  })

  it('should render', () => {
    expect(vdom.type).to.equal('div')
    // expect(vdom.props.children.type).to.equal('');
  })

})
