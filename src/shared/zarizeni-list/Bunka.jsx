/** Created by hhj on 1/11/16. */

import React, { PropTypes } from 'react'

export default class Bunka extends React.Component {
  static propTypes = {
    column: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    model: PropTypes.object.isRequired
  };

  render() {
    const { column, model } = this.props
    const content = (typeof column.render === 'function') ? column.render(model) : model[column.name]
    return (
      <div className="myTableRowItem" key={column.name}>
        {content}
      </div>
    )
  }
}
