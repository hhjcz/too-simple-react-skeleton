/** Created by hhj on 12/30/15. */
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Record } from 'immutable'

import Bunka from './Bunka'
import './Tabulka.styl'

export default class Radka extends React.Component {
  static propTypes = {
    zarizeni: PropTypes.instanceOf(Record).isRequired,
    columns: PropTypes.object.isRequired
  };

  render() {
    const { zarizeni, columns } = this.props
    return (
      <div className="Table-row">
        {
          columns.map(col => <Bunka column={col} model={zarizeni} />)
        }
      </div>
    )
  }
}
