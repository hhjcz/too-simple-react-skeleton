/** Created by hhj on 1/21/16. */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'

import HeaderFilter from '../HeaderFilter'

describe('zarizeni-list HeaderFilter component', () => {
  let vdom
  let instance   // eslint-disable-line no-unused-vars

  beforeEach(() => {
    const tree = sd.shallowRender(React.createElement(HeaderFilter, {}))

    instance = tree.getMountedInstance()
    vdom = tree.getRenderOutput()
    // console.log(vdom.props.children[1].props.children)
  })

  it('should render', () => {
    expect(vdom.type).to.equal('div')
    expect(vdom.props.children[0].type).to.equal('div');
  })

})
