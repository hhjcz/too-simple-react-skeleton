/** Created by hhj on 12/30/15. */
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Record } from 'immutable'
import './Tabulka.styl'

export default class Radka extends React.Component {
  static propTypes = {
    zarizeni: PropTypes.instanceOf(Record)
  };

  render() {
    const { zarizeni } = this.props
    return (
      <div className="Table-row">
        <div className="Table-row-item">
          <Link to={'/zarizeni/' + zarizeni.id}>{zarizeni.id}</Link>
        </div>
        <div className="Table-row-item">
          {zarizeni.name}
        </div>
      </div>
    )
  }
}
