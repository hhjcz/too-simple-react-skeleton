/** Created by hhj on 2/2/16. */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import { ZarizeniFactory } from '../../../app/models/Zarizeni'
import ZarizeniDetail from '../ZarizeniDetail'

describe('zarizeni ZarizeniDetail component', () => {
  let tree
  let vdom
  let instance   // eslint-disable-line no-unused-vars

  beforeEach(() => {
    const zarizeni = ZarizeniFactory({ id: 666 })
    tree = sd.shallowRender(React.createElement(ZarizeniDetail, { zarizeni }))

    instance = tree.getMountedInstance()
    vdom = tree.getRenderOutput()
    // console.log(vdom)
  })

  it('should render', () => {
    expect(vdom.type).to.equal('div')
  })

})
