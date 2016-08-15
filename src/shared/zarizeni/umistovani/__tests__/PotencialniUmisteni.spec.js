/** Created by hhj on 3/17/16. */
/* eslint-disable no-unused-expressions, no-unused-vars, import/no-extraneous-dependencies */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import PotencialniUmisteni from '../PotencialniUmisteni'

describe('umistovani PotencialniUmisteni component', () => {
  const shallowRender = (props) => sd.shallowRender(React.createElement(PotencialniUmisteni, props))

  it('should render with default props', () => {
    const tree = shallowRender()
    expect(tree.type).to.equal('div')
  })

})
