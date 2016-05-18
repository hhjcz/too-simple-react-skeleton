/** Created by hhj on 2/2/16. */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'

import LokalitaDetail from '../LokalitaDetail'

describe('zarizeni ZarizeniDetail component', () => {
  let tree
  let vdom
  let instance   // eslint-disable-line no-unused-vars

  beforeEach(() => {
    tree = sd.shallowRender(React.createElement(LokalitaDetail, { lokalita: { id: 666 } }))

    instance = tree.getMountedInstance()
    vdom = tree.getRenderOutput()
    // console.log(vdom)
  })

  it('should render', () => {
    expect(vdom.type).to.equal('div')
  })

})
