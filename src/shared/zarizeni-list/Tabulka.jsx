/**
 * Created by hhj on 12/28/15.
 */

import React, {PropTypes} from 'react'

export default class Tabulka extends React.Component {
  static propTypes = {
    seznamZarizeni: PropTypes.object
  }

  render() {
    console.log(this.props)
    const {seznamZarizeni} = this.props
    console.log(seznamZarizeni.toObject())

    return (
      <div>
        <ul>
          {
            seznamZarizeni.map(zarizeni => {
              console.log(zarizeni.get('id'))
              return <li key={zarizeni.get('id')}>{zarizeni.get('name')}</li>
            })
          }
        </ul>
      </div>
    )
  }
}
