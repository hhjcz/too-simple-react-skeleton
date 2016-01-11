/** Created by hhj on 12/30/15. */
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Record, List } from 'immutable'
import './Tabulka.styl'

export default class Radka extends React.Component {
  static propTypes = {
    zarizeni: PropTypes.instanceOf(Record),
    columns: PropTypes.instanceOf(List)
  };

  render() {
    const { zarizeni, columns } = this.props
    return (
      <div className="Table-row">
        {
          columns.map(col => {
            return (
              <div className="Table-row-item" key={col.name}>
                <Link to={'/zarizeni/' + zarizeni[col.name]}>{zarizeni[col.name]}</Link>
              </div>
            )
          })
        }
      </div>
    )
  }
}
