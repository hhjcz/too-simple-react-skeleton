/** Created by hhj on 2/16/16. */
import chai, { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import { List } from 'immutable'

import Umistovani from '../Umistovani'

describe('umistovani Umistovani component', () => {
  let tree
  let vdom
  let instance   // eslint-disable-line no-unused-vars

  const shallowRender = (props) => {
    tree = sd.shallowRender(React.createElement(Umistovani, props))

    instance = tree.getMountedInstance()
    vdom = tree.getRenderOutput()
    // console.log(vdom)
  }

  it('should render with default props', () => {
    shallowRender()
    expect(vdom.type).to.equal('div')
    // expect(vdom.props.children.type).to.equal('');
  })

  it('should render with list of umisteni and zarizeni', () => {
    shallowRender({ umisteni: List([{ id: 666 }]), zarizeni: { id: 66, name: 'someZarizeni' } })
    expect(vdom.type).to.equal('div')
    // expect(vdom.props.children.type).to.equal('');
  })

})
