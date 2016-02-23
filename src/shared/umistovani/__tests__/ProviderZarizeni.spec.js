/** Created by hhj on 2/23/16. */
import chai, { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'

import ProviderZarizeni from '../ProviderZarizeni'

describe('umistovani ProviderZarizeni component', () => {
  let tree
  let vdom
  let instance   // eslint-disable-line no-unused-vars

  const shallowRender = (props) => {
    tree = sd.shallowRender(React.createElement(ProviderZarizeni, props))

    instance = tree.getMountedInstance()
    vdom = tree.getRenderOutput()
    // console.log(vdom)
  }

  it('should render with default props', () => {
    shallowRender()
    expect(vdom.type).to.equal('div')
    // expect(vdom.props.children.type).to.equal('');
  })

})
