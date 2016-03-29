/** Created by hhj on 12/30/15. */
import React, { PropTypes } from 'react'
import { Record } from 'immutable'

import Bunka from './Bunka'

export default class Radka extends React.Component {
  static propTypes = {
    zarizeni: PropTypes.instanceOf(Record).isRequired,
    columns: PropTypes.object.isRequired,
    pozice: PropTypes.number,
  };

  render() {
    const { zarizeni, columns, pozice } = this.props
    return (
      <div className="myTableRow">
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
