/** Created by hhj on 3/3/16. */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'

import PredefinedViews from '../PredefinedViews'

describe('zarizeni-list PredefinedViews component', () => {
  const shallowRender = (props) => sd.shallowRender(React.createElement(PredefinedViews, props))

  it('should render with default props', () => {
    const tree = shallowRender()
    expect(tree.type).to.equal('div')
  })

})
