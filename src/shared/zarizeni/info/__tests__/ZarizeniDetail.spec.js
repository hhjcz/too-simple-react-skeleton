/** Created by hhj on 2/2/16. */
/* eslint-disable no-unused-expressions, no-unused-vars, import/no-extraneous-dependencies */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import { ZarizeniFactory } from '../../../app/models/Zarizeni'
import ZarizeniDetail from '../ZarizeniDetail'

describe('zarizeni ZarizeniDetail component', () => {
  let tree
  beforeEach(() => {
    const zarizeni = ZarizeniFactory({ id: 666 })
    tree = sd.shallowRender(React.createElement(ZarizeniDetail, { zarizeni }))
  })

  it('should render', () => {
    expect(tree.type).to.equal('div')
  })

})
