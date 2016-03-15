/** Created by hhj on 2/16/16. */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'

import MarkedLokalita from '../MarkedLokalita'

describe('umistovani MarkedLokalita component', () => {
  let vdom

  beforeEach(() => {
    const tree = sd.shallowRender(React.createElement(MarkedLokalita, {}))

    // const instance = tree.getMountedInstance()
    vdom = tree.getRenderOutput()
    // console.log(vdom)
  })

  it('should render', () => {
    expect(vdom.type).to.equal('span')
    // expect(vdom.props.children.type).to.equal('');
  })

})
