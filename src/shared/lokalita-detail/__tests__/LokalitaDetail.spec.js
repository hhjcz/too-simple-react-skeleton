/** Created by hhj on 2/2/16. */
/* eslint-disable no-unused-expressions, no-unused-vars, import/no-extraneous-dependencies */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'

import LokalitaDetail from '../LokalitaDetail'

describe('zarizeni ZarizeniDetail component', () => {
  const shallowRender = (props) => sd.shallowRender(React.createElement(LokalitaDetail, props))

  it('should render', () => {
    const tree = shallowRender({ lokalita: { id: 666 } })
    expect(tree.type).to.equal('div')
  })

})
