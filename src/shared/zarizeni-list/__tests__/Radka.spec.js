/** Created by hhj on 1/4/16. */

/** Created by hhj on 1/4/16. */

import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import { Link } from 'react-router'

import { Zarizeni } from '../../zarizeni/core'
import Radka from './../Radka'

describe('zarizeni-list Radka component', () => {
  let vdom
  let instance // eslint-disable-line no-unused-vars

  beforeEach(() => {
    const zarizeni = new Zarizeni({ id: 666 })
    const tree = sd.shallowRender(React.createElement(Radka, { zarizeni }))

    instance = tree.getMountedInstance()
    vdom = tree.getRenderOutput()
    // console.log(vdom.props.children.type)
  })

  it('should render ', () => {
    expect(vdom.type).to.equal('li')
    expect(vdom.props.children.type).to.equal(Link);
  })

})
