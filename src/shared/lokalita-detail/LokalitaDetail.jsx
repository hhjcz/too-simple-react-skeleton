/** Created by hhj on 12/30/15. */
import React, { PropTypes } from 'react'
import { Lokalita } from '../app/models/Lokalita'
import NepiOpy from '../umistovani/NepiOpy'
import UmistenaZarizeni from '../lokalita-list/UmistenaZarizeni'
import MarkedLokalita from '../umistovani/MarkedLokalita'

export default class LokalitaDetail extends React.Component {
  static propTypes = {
    lokalita: PropTypes.instanceOf(Lokalita).isRequired,
  };

  render() {
    const { lokalita } = this.props
    return (
      <div>
        <MarkedLokalita lokalita={lokalita} />
        <div>id: {lokalita.id}</div>
        <div>obec: {lokalita.obec}</div>
        <div>ulice: {lokalita.ulice}</div>
        <div>číslo popisné: {lokalita.cispop}</div>
        <div>číslo orientační: {lokalita.cisori}</div>
        <div>číslo doplňkové: {lokalita.cisdop}</div>
        <div>akrlok: {lokalita.akrlok}</div>
        <NepiOpy nepiOpy={lokalita.nepiOpy} size={100000} />
        <UmistenaZarizeni umistenaZarizeni={lokalita.umistenaZarizeni} />
      </div>
    )
  }
}
