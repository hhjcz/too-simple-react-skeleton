/** Created by hhj on 12/30/15. */
import React, { PropTypes } from 'react'
import { Zarizeni } from '../app/models/Zarizeni'
import NepiOpy from '../umistovani/NepiOpy'
import UmistenaZarizeni from '../lokalita-list/UmistenaZarizeni'

export default class ZarizeniDetail extends React.Component {
  static propTypes = {
    lokalita: PropTypes.instanceOf(Zarizeni).isRequired,
  };

  render() {
    const { lokalita } = this.props
    return (
      <div>
        <div>id: {lokalita.id}</div>
        <div>obec: {lokalita.obec}</div>
        <div>ulice: {lokalita.ulice}</div>
        <div>číslo popisné: {lokalita.cispop}</div>
        <div>číslo orientační: {lokalita.cisori}</div>
        <div>číslo doplňkové: {lokalita.cisdop}</div>
        <div>akrlok: {lokalita.akrlok}</div>
        <NepiOpy nepiOpy={lokalita.nepiOpy} />
        <UmistenaZarizeni umistenaZarizeni={lokalita.umistenaZarizeni} />
      </div>
    )
  }
}
