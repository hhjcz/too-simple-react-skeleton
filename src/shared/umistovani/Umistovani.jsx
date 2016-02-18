/** Created by hhj on 2/4/16. */
import React, { PropTypes } from 'react'
import findLokalitaHint from './findLokalitaHint'
import MarkedLokalita from './MarkedLokalita'
import LokalitaHint from './LokalitaHint'

export default class Umistovani extends React.Component {

  static propTypes = {
    zarizeni: PropTypes.object.isRequired,
    seznamUmisteni: PropTypes.object.isRequired,
    actions: PropTypes.object,
  };

  static defaultProps = {
    zarizeni: {},
    seznamUmisteni: {},
  };

  constructor(props) {
    super(props)
    this.searchForUmisteni = this.searchForUmisteni.bind(this)
  }

  searchForUmisteni(lokalitaHint) {
    const zarizeni = this.props.zarizeni
    const params = {
      search: true,
      zarizeni_id: zarizeni.id,
      obec: 'Praha',
      'trimmed_ulice-lk': lokalitaHint.ulice,
    }
    this.props.actions.fetchAll({ params })
  }

  render() {
    /* @type {Zarizeni} zarizeni */
    const { zarizeni, seznamUmisteni } = this.props
    const lokalitaHint = findLokalitaHint(zarizeni.name)
    return (
      <div>
        <div>#{`${zarizeni.id} ${zarizeni.name}`}</div>
        <div>Mapa: {zarizeni.defaultmap}</div>
        <LokalitaHint lokalitaHint={lokalitaHint} searchForUmisteni={this.searchForUmisteni} />
        {
          seznamUmisteni.map && seznamUmisteni.map(u =>
            <MarkedLokalita lokalitaHint={lokalitaHint} lokalita={u.lokalita} key={u.id} />
          )
        }
      </div>
    )
  }
}
