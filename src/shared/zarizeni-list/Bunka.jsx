/** Created by hhj on 1/11/16. */

import React, { PropTypes } from 'react'

export default class Bunka extends React.Component {
  static propTypes = {
    column: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    model: PropTypes.object.isRequired,
    pozice: PropTypes.number,
  };

  render() {
    const { column, model, pozice } = this.props
    const content = (typeof column.render === 'function')
      ? column.render(model, pozice)
      : model[column.name]
    return (
      <div className={'myTableRowItem' + ` uFlexGrow-${column.width}`} key={column.name}>
        {content}
      </div>
    )
  }
}
