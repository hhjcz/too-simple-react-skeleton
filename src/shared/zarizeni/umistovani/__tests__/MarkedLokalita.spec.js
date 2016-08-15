/** Created by hhj on 2/16/16. */
/* eslint-disable no-unused-expressions, no-unused-vars, import/no-extraneous-dependencies */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'

import MarkedLokalita from '../MarkedLokalita'

describe('umistovani MarkedLokalita component', () => {
  let tree

  beforeEach(() => {
    tree = sd.shallowRender(React.createElement(MarkedLokalita, {}))
  })

  it('should render', () => {
    expect(tree.type).to.equal('span')
  })

})
