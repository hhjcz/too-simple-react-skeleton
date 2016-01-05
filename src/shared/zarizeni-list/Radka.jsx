/** Created by hhj on 12/30/15. */
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Record } from 'immutable'

export default class Radka extends React.Component {
  static propTypes = {
    zarizeni: PropTypes.instanceOf(Record)
  }

  render() {
    const { zarizeni } = this.props
    return (
      <li><Link to={'/zarizeni/' + zarizeni.id}>{zarizeni.id} - {zarizeni.name}</Link></li>
    )
  }
}
