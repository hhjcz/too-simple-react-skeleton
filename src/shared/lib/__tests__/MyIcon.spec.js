/** Created by hhj on 3/16/16. */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import MyIcon from '../MyIcon'

describe('lib MyIcon component', () => {
  let vdom
  // let instance

  const shallowRender = (props) => {
    const tree = sd.shallowRender(React.createElement(MyIcon, props))

    // instance = tree.getMountedInstance()
    vdom = tree.getRenderOutput()
    // console.log(vdom)
  }

  it('should render with default props', () => {
    shallowRender()
    expect(vdom.props.color).to.equal('white')
    expect(vdom.props.style).to.deep.equal({ verticalAlign: 'middle', fontSize: '20px' })
  })

  it('should pass props to FontIcon', () => {
    shallowRender({
      children: 'circle',
      someProp: 'someValue',
      color: 'someColor',
      style: { someStyle: 'someStyleValue' }
    })
    expect(vdom.props.someProp).to.equal('someValue')
    expect(vdom.props.color).to.equal('someColor')
    expect(vdom.props.style).to.deep.equal({ verticalAlign: 'middle', someStyle: 'someStyleValue', fontSize: '20px' })
  })

})
