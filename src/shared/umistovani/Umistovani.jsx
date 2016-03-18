/** Created by hhj on 2/4/16. */
import React, { PropTypes } from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import findLokalitaHint from './findLokalitaHint'
import ZarizeniInfo from './ZarizeniInfo'
import HintForm from './HintForm'
import PotencialniUmisteni from './PotencialniUmisteni'

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
    if (lokalitaHint.op) params.op = `${lokalitaHint.op}`

    actions.umisteni.fetchAll({ params }).catch(error => console.info(error))
  }

  umistitZarizeni(umisteni) {
    const { zarizeni, actions } = this.props
    const umisteneZarizeni = zarizeni.toObject()
    umisteneZarizeni.umisteni = umisteni
    actions.zarizeni.update({ params: { id: umisteneZarizeni.id }, body: umisteneZarizeni })
      .then(actions.reload)
  }

  deleteAllUmisteni() {
    const { actions } = this.props
    const params = { zarizeni_id: this.props.zarizeni.id }
    this.props.actions.umisteni.destroy({ params })
      .then(actions.reload)
      .catch(actions.reload)
  }

  render() {
    const { zarizeni, seznamUmisteni } = this.props
    if (!(zarizeni.id > 0)) return null

    const self = this
    const lokalitaHint = findLokalitaHint(zarizeni.name, zarizeni.defaultmap, zarizeni.id)

    return (
      <div>
        <ZarizeniInfo zarizeni={zarizeni} />
        <HintForm lokalitaHint={lokalitaHint} searchForUmisteni={this.searchForUmisteni} />
        <PotencialniUmisteni lokalitaHint={lokalitaHint} seznamUmisteni={seznamUmisteni} umistiZarizeni={self.umistitZarizeni} deleteAllUmisteni={self.deleteAllUmisteni} />
      </div>
    )
  }
}
