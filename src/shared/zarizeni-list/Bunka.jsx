/** Created by hhj on 1/11/16. */

import React, {PropTypes} from 'react'

export default class Bunka extends React.Component {
  static propTypes = {
    column: PropTypes.object.isRequired,
    children: PropTypes.object
  };

  render() {
    const { column } = this.props
    return (
      <div className="Table-row-item" key={column.name}>
        {this.props.children}
      </div>
    )
  }
}
