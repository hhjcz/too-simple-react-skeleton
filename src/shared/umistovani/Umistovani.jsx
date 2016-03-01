/** Created by hhj on 2/4/16. */
import React, { PropTypes } from 'react'
import findLokalitaHint from './findLokalitaHint'
import MarkedLokalita from './MarkedLokalita'
import HintForm from './HintForm'

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
    this.deleteAllUmisteni = this.deleteAllUmisteni.bind(this)
  }

  /**
   * @param {LokalitaHint} lokalitaHint
   */
  searchForUmisteni(lokalitaHint) {
    const zarizeni = this.props.zarizeni
    const params = {
      search: '',
      zarizeni_id: zarizeni.id,
      include: 'lokalita',
    }
    if (lokalitaHint.obec) params.obec = lokalitaHint.obec
    if (lokalitaHint.cislo) params.cislo = lokalitaHint.cislo
    if (lokalitaHint.ulice) params['trimmed_ulice-lk'] = lokalitaHint.ulice

    this.props.actions.fetchAll({ params })
  }

  deleteAllUmisteni() {
    const params = { zarizeni_id: this.props.zarizeni.id, include: 'lokalita' }
    this.props.actions.destroy({ params })
      .then(() => this.props.actions.fetchAll({ params }))
      .catch(() => this.props.actions.fetchAll({ params }))
  }

  render() {
    const self = this
    /** @type {Zarizeni} zarizeni */
    const { zarizeni, seznamUmisteni } = this.props
    const lokalitaHint = findLokalitaHint(zarizeni.name, zarizeni.defaultmap, zarizeni.id)
    return (
      <div>
        <div>#{`${zarizeni.id} ${zarizeni.name}`}</div>
        <div>Mapa: {zarizeni.defaultmap}</div>
        <HintForm lokalitaHint={lokalitaHint} searchForUmisteni={this.searchForUmisteni} />
        {
          seznamUmisteni.map && seznamUmisteni.map(u =>
            <MarkedLokalita lokalitaHint={lokalitaHint} lokalita={u.lokalita} key={u.id} />
          )
        }
        <div className="btn btn-sm btn-danger" onClick={ function() { self.deleteAllUmisteni() } }>
          Delete all umisteni
        </div>
      </div>
    )
  }
}
