/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'

import Radka from './Radka.jsx'

export default class Tabulka extends React.Component {
  static propTypes = {
    seznamZarizeni: PropTypes.object
  }

  render() {
    // console.log(this.props)
    const { seznamZarizeni } = this.props
    // console.log(seznamZarizeni.toObject())

    return (
      <div className="Table container-fluid">
          {
            seznamZarizeni.map(zarizeni => {
              return <Radka key={zarizeni.id} zarizeni={zarizeni} />
            })
          }
      </div>
    )
  }
}
