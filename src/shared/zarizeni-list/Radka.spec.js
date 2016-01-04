/** Created by hhj on 1/4/16. */

/** Created by hhj on 1/4/16. */

import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import { Link } from 'react-router'

import Radka from './Radka.jsx'

describe('zarizeni-list Radka component', () => {
  let vdom
  let instance // eslint-disable-line no-unused-vars

  beforeEach(() => {
    const tree = sd.shallowRender(React.createElement(Radka, { zarizeni: { id: 666 } }))

    instance = tree.getMountedInstance()
    vdom = tree.getRenderOutput()
    // console.log(vdom.props.children.type)
  })

  it('should render ', () => {
    expect(vdom.type).to.equal('li')
    expect(vdom.props.children.type).to.equal(Link);
  })

})
