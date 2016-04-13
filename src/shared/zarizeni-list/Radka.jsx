/** Created by hhj on 12/30/15. */
import React, { PropTypes } from 'react'
import Bunka from './Bunka'

export default class Radka extends React.Component {
  static propTypes = {
    zarizeni: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired,
    pozice: PropTypes.number,
    highlighted: PropTypes.bool,
  };

  render() {
    const { zarizeni, columns, pozice, highlighted } = this.props
    const shadowedClass = zarizeni.deletedAt !== null ? 'shadowed' : ''
    const highlightedClass = highlighted ? 'highlighted' : ''
    const title = zarizeni.deletedAt !== null ? `${zarizeni.name} deleted at ${zarizeni.deletedAt}` : zarizeni.name

    return (
      <div title={title} className={`myTableRow ${highlightedClass} ${shadowedClass}`}>
        {
          columns.map(col => {    // eslint-disable-line arrow-body-style
            return col.visible ?
              <Bunka column={col} model={zarizeni} pozice={pozice} key={col.name} />
              : null
          })
        }
      </div>
    )
  }
}
