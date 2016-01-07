/** Created by hhj on 12/30/15. */
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Record } from 'immutable'

export default class Radka extends React.Component {
  static propTypes = {
    zarizeni: PropTypes.instanceOf(Record)
  }

  render() {
    let style = {}
    if (process.env.IS_BROWSER) {
      style = require('./Tabulka.scss')
      console.log('Style: ', style)
    }
    const { zarizeni } = this.props
    return (
      <div className="row">
        <div className="col-sm-1">
          <Link to={'/zarizeni/' + zarizeni.id}>{zarizeni.id}</Link>
        </div>
        <div className={style.cervena + ' col-sm-2'}>
          {zarizeni.name}
        </div>
      </div>
    )
  }
}
