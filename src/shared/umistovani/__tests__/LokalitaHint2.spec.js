/** Created by hhj on 3/1/16. */
import chai, { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'

import ReduxFormWrapper, { LokalitaHint2 } from '../LokalitaHint2'

describe('umistovani ReduxFormWrapper wrapper for LokalitaHint2 component', () => {
  let tree
  let vdom
  let instance   // eslint-disable-line no-unused-vars

  const shallowRender = (props) => {
    tree = sd.shallowRender(React.createElement(ReduxFormWrapper, props))

    instance = tree.getMountedInstance()
    vdom = tree.getRenderOutput()
    // console.log(vdom)
  }

  it('should render with default props', () => {
    shallowRender()
    expect(typeof vdom.props).to.equal('object')
    // expect(vdom.props.children.type).to.equal('');
  })

})
