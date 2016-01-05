/** Created by hhj on 1/4/16. */
import { expect } from 'chai'
import React from 'react'
import { List } from 'immutable'
import sd from 'skin-deep'

import Tabulka from './../Tabulka.jsx'

describe('zarizeni-list Tabulka component', () => {
  let vdom
  let instance   // eslint-disable-line no-unused-vars

  beforeEach(() => {
    const tree = sd.shallowRender(React.createElement(Tabulka, { seznamZarizeni: List() }))

    instance = tree.getMountedInstance()
    vdom = tree.getRenderOutput()
    // console.log(vdom)
  })

  it('should render', () => {
    expect(vdom.type).to.equal('div')
    expect(vdom.props.children.type).to.equal('ul');
  })

})
