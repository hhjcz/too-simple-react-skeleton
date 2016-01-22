/** Created by hhj on 1/4/16. */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import { Link } from 'react-router' // eslint-disable-line no-unused-vars

import { Zarizeni } from '../../zarizeni/core'
import Radka from '../Radka'
import { columns } from '../column'

describe('zarizeni-list Radka component', () => {
  let vdom
  let instance // eslint-disable-line no-unused-vars

  beforeEach(() => {
    const zarizeni = new Zarizeni({ id: 666 })
    const tree = sd.shallowRender(
      React.createElement(Radka, { zarizeni, columns: columns.toList() })
    )

    instance = tree.getMountedInstance()
    vdom = tree.getRenderOutput()
    // console.log(vdom.props.children[0])
  })

  it('should render ', () => {
    expect(vdom.type).to.equal('div')
    // expect(vdom.props.children[0].type).to.equal('div');
  })

})
