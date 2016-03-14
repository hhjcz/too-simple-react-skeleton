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
      <li key={nepiOp.ixop}>
        {nepiOp.ixop} {nepiOp.akronym} "{nepiOp.nazevFirmy}"
      </li>
    )

    return (
      <div>
        { nepiOpy.length > 0 ? <ul> { listItems } </ul> : null }
      </div>
    )
  }
}
