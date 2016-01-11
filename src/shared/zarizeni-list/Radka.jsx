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
        <Bunka column={columns.id}>
          <Link to={'/zarizeni/' + zarizeni.id}>{zarizeni.id}</Link>
        </Bunka>
        <Bunka column={columns.name}>
          <Link to={'/zarizeni/' + zarizeni.id}>{zarizeni.name}</Link>
        </Bunka>
      </div>
    )
  }
}
