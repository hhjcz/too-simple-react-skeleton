/** Created by hhj on 5/18/16. */
/* eslint-disable no-unused-expressions, no-unused-vars, import/no-extraneous-dependencies */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import UmistenaZarizeni from '../UmistenaZarizeni'

describe('lokalita-list UmistenaZarizeni component', () => {
  const shallowRender = (props) => sd.shallowRender(React.createElement(UmistenaZarizeni, props))

  it('should render with default props', () => {
    const tree = shallowRender()
    expect(tree.type).to.equal('div')
  })

})
