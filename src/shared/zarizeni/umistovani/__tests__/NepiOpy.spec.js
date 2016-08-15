/** Created by hhj on 3/11/16. */
/* eslint-disable no-unused-expressions, no-unused-vars, import/no-extraneous-dependencies */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import NepiOpy from '../NepiOpy'
import { NepiOpyFactory } from '../../../app/models/NepiOpy'

describe('umistovani NepiOpy component', () => {
  const shallowRender = (props) => sd.shallowRender(React.createElement(NepiOpy, props))

  it('should render with default props', () => {
    const tree = shallowRender()
    expect(tree.type).to.equal('div')
    // expect(vdom.props.children.type).to.equal('');
  })

  it('should render with actual props', () => {
    const tree = shallowRender({ nepiOpy: NepiOpyFactory([{ ixop: 66 }, { ixop: 666 }]) })
    expect(tree.type).to.equal('div')
    // expect(vdom.props.children.type).to.equal('');
  })

})
