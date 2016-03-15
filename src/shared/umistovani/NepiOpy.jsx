/** Created by hhj on 3/11/16. */
import React, { PropTypes } from 'react'
import { uniqBy } from 'lodash'

export default class NepiOpy extends React.Component {
  static propTypes = {
    nepiOpy: PropTypes.object,
  };

  static defaultProps = {
    nepiOpy: [],
  };

  render() {
    let { nepiOpy } = this.props
    nepiOpy = nepiOpy.toArray ? nepiOpy.toArray() : nepiOpy
    const uniqNepiOpy = uniqBy(nepiOpy, nepiOp => nepiOp.ixop)

    const listItems = uniqNepiOpy.map(nepiOp =>
      <div style={{ paddingLeft: '1em' }} key={nepiOp.ixop}>
        {nepiOp.ixop} {nepiOp.akronym} "{nepiOp.nazevFirmy}"
      </div>
    )

    const divHeight = Math.max(Math.ceil(uniqNepiOpy.length / 2 * 1.6), 2)

    return listItems.length > 0 ?
      <div style={{ display: 'flex', flexFlow: 'column wrap', height: `${divHeight}em` }}>
        { listItems }
      </div>
      : <div />

  }
}
