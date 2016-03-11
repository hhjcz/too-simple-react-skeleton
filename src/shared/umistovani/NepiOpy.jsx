/** Created by hhj on 3/11/16. */

import React, { PropTypes } from 'react'

export default class NepiOpy extends React.Component {
  static propTypes = {
    nepiOpy: PropTypes.object,
  };

  static defaultProps = {
    nepiOpy: [],
  };

  render() {
    const { nepiOpy } = this.props
    const listItems = nepiOpy.map(nepiOp =>
      <li key={nepiOp.ixop}>
        {nepiOp.ixop} {nepiOp.akronym} "{nepiOp.nazevFirmy}"
      </li>
    )

    return (
      <div>
        { nepiOpy.size > 0 ? <ul> { listItems } </ul> : null }
      </div>
    )
  }
}
