/** Created by hhj on 2/16/16. */
import chai, { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'

import Lokalita from '../Lokalita'

describe('umisteni Lokalita component', () => {
  let tree
  let vdom
  let instance   // eslint-disable-line no-unused-vars

  beforeEach(() => {
    tree = sd.shallowRender(React.createElement(Lokalita, {}))

    instance = tree.getMountedInstance()
    vdom = tree.getRenderOutput()
    // console.log(vdom)
  })

  it('should render', () => {
    expect(vdom.type).to.equal('div')
    // expect(vdom.props.children.type).to.equal('');
  })

})
