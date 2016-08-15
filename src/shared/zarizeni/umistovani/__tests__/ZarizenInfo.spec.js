/** Created by hhj on 3/15/16. */
/* eslint-disable no-unused-expressions, no-unused-vars, import/no-extraneous-dependencies */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import ZarizeniInfo from '../ZarizeniInfo'

describe('umistovani ZarizeniInfo component', () => {
  const shallowRender = (props) => sd.shallowRender(React.createElement(ZarizeniInfo, props))

  it('should render with default props', () => {
    const tree = shallowRender()
    expect(tree.type).to.equal('div')
    // expect(vdom.props.children.type).to.equal('');
  })

})
