/** Created by hhj on 2/4/16. */
import React, { PropTypes } from 'react'
import shallowCompare from 'react-addons-shallow-compare'
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
    this.umistitZarizeni = this.umistitZarizeni.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  /**
   * @param {LokalitaHint} lokalitaHint
   */
  searchForUmisteni(lokalitaHint) {
    const { zarizeni, actions } = this.props
    const params = {
      search: '',
      zarizeni_id: zarizeni.id,
      include: 'lokalita',
    }
    if (lokalitaHint.obec) params.obec = lokalitaHint.obec
    if (lokalitaHint.cislo) params.cislo = lokalitaHint.cislo
    if (lokalitaHint.ulice) params['trimmed_ulice-lk'] = lokalitaHint.ulice
    if (lokalitaHint.akrlok) params['akrlok-lk'] = lokalitaHint.akrlok
    params.include = 'lokalita.nepi_opy'

    actions.umisteni.fetchAll({ params })
  }

  umistitZarizeni(umisteni) {
    const { zarizeni, actions } = this.props
    const umisteneZarizeni = zarizeni.toObject()
    umisteneZarizeni.umisteni = umisteni
    actions.zarizeni.update({ params: { id: umisteneZarizeni.id }, body: umisteneZarizeni })
  }

  deleteAllUmisteni() {
    const params = { zarizeni_id: this.props.zarizeni.id, include: 'lokalita' }
    this.props.actions.umisteni.destroy({ params })
      .then(() => this.props.actions.umisteni.fetchAll({ params }))
      .catch(() => this.props.actions.umisteni.fetchAll({ params }))
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
          seznamUmisteni.map && seznamUmisteni.filter(umisteni => umisteni.lokalita.id > 0).map(umisteni =>
            <div>
              <span className="btn-sm btn-success glyphicon glyphicon-ok" onClick={function () {self.umistitZarizeni(umisteni)}}></span>
              <MarkedLokalita lokalitaHint={lokalitaHint} lokalita={umisteni.lokalita} key={umisteni.id} />
            </div>
          )
        }
        <div className="btn btn-sm btn-danger" onClick={ function() { self.deleteAllUmisteni() } }>
          Delete all umisteni
        </div>
      </div>
    )
  }
}
