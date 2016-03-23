/** Created by hhj on 12/30/15. */
import React, { PropTypes } from 'react'

export default class Zarizeni extends React.Component {
  static propTypes = {
    zarizeni: PropTypes.object.isRequired,
  };

  render() {
    const { zarizeni } = this.props
    return (
      <div>
        <div>id: {zarizeni.id}</div>
        <div>name: {zarizeni.name}</div>
        <div>info name: {zarizeni.infoName}</div>
        <div>deleted at: {zarizeni.deletedAt}</div>
      </div>
    )
  }
}
