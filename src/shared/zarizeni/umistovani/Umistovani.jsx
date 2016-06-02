/** Created by hhj on 2/4/16. */
import React, { PropTypes } from 'react'
import { List } from 'immutable'
import shallowCompare from 'react-addons-shallow-compare'
import findLokalitaHint from './findLokalitaHint'
import ZarizeniInfo from './ZarizeniInfo'
import HintForm from './HintForm'
import PotencialniUmisteni from './PotencialniUmisteni'
import SeznamPortu from './SeznamPortu'

export default class Umistovani extends React.Component {

  static propTypes = {
    zarizeni: PropTypes.object.isRequired,
    seznamUmisteni: PropTypes.instanceOf(List).isRequired,
    seznamPortu: PropTypes.instanceOf(List).isRequired,
    akrloks: PropTypes.instanceOf(List),
    fetching: PropTypes.bool,
    actions: PropTypes.object,
  };

  static defaultProps = {
    zarizeni: {},
    seznamUmisteni: List(),
    seznamPortu: List(),
    akrloks: List(),
    fetching: false,
    actions: {},
  };

  constructor(props) {
    super(props)
    this.searchForUmisteni = this.searchForUmisteni.bind(this)
    this.deleteAllUmisteni = this.deleteAllUmisteni.bind(this)
    this.zrusitUmisteni = this.zrusitUmisteni.bind(this)
    this.umistitZarizeni = this.umistitZarizeni.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !nextProps.fetching && shallowCompare(this, nextProps, nextState)
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
    if (lokalitaHint.ulice) params['trimmedUlice-lk'] = `%${lokalitaHint.ulice.toLowerCase().replace(' ', '')}%`
    if (lokalitaHint.akrlok) params['akrlok-lk'] = `%${lokalitaHint.akrlok}%`
    if (lokalitaHint.ixlok) params.ixlok = lokalitaHint.ixlok
    if (lokalitaHint.ixop_or_akronym) params.ixop_or_akronym = lokalitaHint.ixop_or_akronym

    actions.umisteni.fetchCollection({ params }).catch(error => console.info(error))
  }

  umistitZarizeni(umisteni) {
    const { zarizeni, actions } = this.props
    const umisteneZarizeni = zarizeni.toObject()
    umisteneZarizeni.umisteni = umisteni
    actions.zarizeni.update({ params: { id: umisteneZarizeni.id }, body: umisteneZarizeni })
      .then(actions.reload)
  }

  zrusitUmisteni() {
    const { actions } = this.props
    const params = { id: this.props.zarizeni.id, nested: 'umisteni' }
    this.props.actions.zarizeni.destroy({ params })
      .then(actions.reload)
      .catch(actions.reload)
  }

  deleteAllUmisteni() {
    const { actions } = this.props
    const params = { zarizeni_id: this.props.zarizeni.id }
    this.props.actions.umisteni.destroy({ params })
      .then(actions.reload)
      .catch(actions.reload)
  }

  render() {
    const self = this
    const { zarizeni, seznamUmisteni, seznamPortu, akrloks, actions } = this.props
    if (!(zarizeni.id > 0)) return null

    const lokalitaHint = findLokalitaHint(zarizeni.name, zarizeni.defaultmap, zarizeni.id)

    return (
      <div>
        <div className="row">
          <ZarizeniInfo zarizeni={zarizeni} zrusitUmisteni={self.zrusitUmisteni} />
          <SeznamPortu seznamPortu={seznamPortu} />
        </div>
        <HintForm
          lokalitaHint={lokalitaHint} searchForUmisteni={this.searchForUmisteni}
          akrloks={akrloks} actions={actions}
        />
        <PotencialniUmisteni
          lokalitaHint={lokalitaHint}
          seznamUmisteni={seznamUmisteni}
          umistiZarizeni={self.umistitZarizeni}
          deleteAllUmisteni={self.deleteAllUmisteni}
        />
      </div>
    )
  }
}
