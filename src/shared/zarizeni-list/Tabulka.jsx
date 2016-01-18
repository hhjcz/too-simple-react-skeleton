/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'

import Header from './Header'
import Radka from './Radka'
import { columns } from './Column'

export default class Tabulka extends React.Component {
  static propTypes = {
    seznamZarizeni: PropTypes.object,
    onSortChange: PropTypes.func,
    sort: PropTypes.object
  };

  render() {
    // console.log(this.props)
    const { seznamZarizeni, sort, onSortChange } = this.props
    // console.log(seznamZarizeni.toObject())

    return (
      <div className="Table">
        <Header columns={columns} sort={sort} onSortChange={onSortChange} />
        {
          seznamZarizeni.map(zarizeni => {
            return <Radka key={zarizeni.id} zarizeni={zarizeni} columns={columns.toList()} />
          })
        }
      </div>
    )
  }
}
