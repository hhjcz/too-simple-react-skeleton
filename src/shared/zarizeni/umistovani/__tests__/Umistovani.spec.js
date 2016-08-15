/** Created by hhj on 2/16/16. */
/* eslint-disable no-unused-expressions, no-unused-vars, import/no-extraneous-dependencies */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import { List } from 'immutable'

import Umistovani from '../Umistovani'

describe('umistovani Umistovani component', () => {
  const shallowRender = (props) => sd.shallowRender(React.createElement(Umistovani, props))

  it('should render with default props', () => {
    const tree = shallowRender()
    expect(tree.text()).to.equal('')
  })

  it('should render with list of umisteni and zarizeni', () => {
    const tree = shallowRender({ umisteni: List([{ id: 666 }]), zarizeni: { id: 66, name: 'someZarizeni' } })
    expect(tree.type).to.equal('div')
  })

})
