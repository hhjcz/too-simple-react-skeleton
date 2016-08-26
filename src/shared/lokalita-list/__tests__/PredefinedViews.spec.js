/** Created by hhj on 3/3/16. */
/* eslint-disable no-unused-expressions, no-unused-vars, import/no-extraneous-dependencies */
import { expect } from 'chai'
import sinon from 'sinon'
import React from 'react'
import sd from 'skin-deep'

import PredefinedViews from '../PredefinedViews'

describe('lokalita-list PredefinedViews component', () => {
  const shallowRender = (props) => sd.shallowRender(React.createElement(PredefinedViews, props))

  it('should render with default props', () => {
    const tree = shallowRender()
    expect(tree.type).to.equal('div')
  })

  it('handles events', () => {
    const spyFilterChange = sinon.spy()
    const spyNamedFilterChange = sinon.spy()
    const spySetColumnWidth = sinon.spy()
    const spyHideColumn = sinon.spy()
    const spyShowColumn = sinon.spy()

    const tree = shallowRender({
      onFilterChange: spyFilterChange,
      onNamedFilterChange: spyNamedFilterChange,
      setColumnWidth: spySetColumnWidth,
      hideColumn: spyHideColumn,
      showColumn: spyShowColumn,
    })

    tree.everySubTree('MyToggle').forEach(toggle => {
      toggle.props.onToggle()
    })

    expect(spyFilterChange).to.have.been.calledTwice
    expect(spyNamedFilterChange).to.not.have.been.called
    expect(spySetColumnWidth).to.not.have.been.called
    expect(spyHideColumn).to.not.have.been.called
    expect(spyShowColumn).to.not.have.been.called
  })

})
