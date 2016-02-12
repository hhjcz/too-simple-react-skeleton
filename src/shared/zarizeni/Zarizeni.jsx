/** Created by hhj on 12/30/15. */
import React, { PropTypes } from 'react'

export default class Zarizeni extends React.Component {
  static propTypes = {
    zarizeni: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div>
        <div>zarizeni id: {this.props.zarizeni.id}</div>
        <div>zarizeni name: {this.props.zarizeni.name}</div>
      </div>
    )
  }
}
