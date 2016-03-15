/** Created by hhj on 2/4/16. */
import React, { PropTypes } from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import findLokalitaHint from './findLokalitaHint'
import MarkedLokalita from './MarkedLokalita'
import ZarizeniInfo from './ZarizeniInfo'
import HintForm from './HintForm'
import NepiOpy from './NepiOpy'
import './Umistovani.styl'

export default class Umistovani extends React.Component {

  static propTypes = {
    zarizeni: PropTypes.object.isRequired,
    seznamUmisteni: PropTypes.object.isRequired,
    actions: PropTypes.object,
  };

  static defaultProps = {
    zarizeni: {},
    seznamUmisteni: [],
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
    }
    if (lokalitaHint.obec) params.obec = lokalitaHint.obec
    if (lokalitaHint.cislo) params.cislo = lokalitaHint.cislo
    if (lokalitaHint.ulice) params['trimmedUlice-lk'] = `%${lokalitaHint.ulice}%`
    if (lokalitaHint.akrlok) params['akrlok-lk'] = `%${lokalitaHint.akrlok}%`
    if (lokalitaHint.ixlok) params.ixlok = `${lokalitaHint.ixlok}`

    actions.umisteni.fetchAll({ params }).catch(error => console.info(error))
  }

  umistitZarizeni(umisteni) {
    const { zarizeni, actions } = this.props
    const umisteneZarizeni = zarizeni.toObject()
    umisteneZarizeni.umisteni = umisteni
    actions.zarizeni.update({ params: { id: umisteneZarizeni.id }, body: umisteneZarizeni })
      .then(actions.reload())
  }

  deleteAllUmisteni() {
    const params = { zarizeni_id: this.props.zarizeni.id }
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
        <ZarizeniInfo zarizeni={zarizeni} />
        <HintForm lokalitaHint={lokalitaHint} searchForUmisteni={this.searchForUmisteni} />
        {
          seznamUmisteni.map(umisteni =>
            <div>
              <div className="umistovani adresa">
                <MarkedLokalita lokalitaHint={lokalitaHint} lokalita={umisteni.lokalita} key={umisteni.id} />
                <div className="btn btn-xs btn-success glyphicon glyphicon-ok" onClick={function () {self.umistitZarizeni(umisteni)}} />
              </div>
              <NepiOpy nepiOpy={umisteni.lokalita.nepiOpy} />
            </div>
          )
        }
        {
          seznamUmisteni.size > 0 ?
            <div className="btn btn-sm btn-danger" onClick={ function() { self.deleteAllUmisteni() } }>
              Smazat všechna umístění
            </div>
            : null
        }
      </div>
    )
  }
}
