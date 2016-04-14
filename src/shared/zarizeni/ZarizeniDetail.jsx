/** Created by hhj on 12/30/15. */
import React, { PropTypes } from 'react'
import Zarizeni from '../app/models/Zarizeni'

export default class ZarizeniDetail extends React.Component {
  static propTypes = {
    zarizeni: PropTypes.instanceOf(Zarizeni).isRequired,
  };

  render() {
    const { zarizeni } = this.props
    return (
      <div>
        <div>id: {zarizeni.id}</div>
        <div>name: {zarizeni.name}</div>
        <div>info name: {zarizeni.infoName}</div>
        <div>created at: {zarizeni.createdAt}</div>
        <div>updated at: {zarizeni.updatedAt}</div>
        <div>deleted at: {zarizeni.deletedAt}</div>
      </div>
    )
  }
}
