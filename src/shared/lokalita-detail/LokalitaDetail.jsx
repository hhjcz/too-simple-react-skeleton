/** Created by hhj on 12/30/15. */
/* eslint-disable no-nested-ternary */
import React, { PropTypes } from 'react'
import Panel from 'react-bootstrap/lib/Panel'
import IconButton from 'material-ui/IconButton'
import MyIcon from '../lib/components/MyIcon'
import colors from '../app/colors'
import { Lokalita } from '../app/models/Lokalita'
import NepiOpy from '../zarizeni/umistovani/NepiOpy'
import UmistenaZarizeni from '../lokalita-list/UmistenaZarizeni'
import MarkedLokalita from '../zarizeni/umistovani/MarkedLokalita'

export default class LokalitaDetail extends React.Component {
  static propTypes = {
    lokalita: PropTypes.oneOfType([PropTypes.object, PropTypes.instanceOf(Lokalita)]).isRequired,
    fetchZarizeni: PropTypes.func.isRequired,
    zarizeni: PropTypes.object,
    fetchNepiOpy: PropTypes.func.isRequired,
    nepiOpy: PropTypes.object,
  };

  constructor(props) {
    super(props)
    this.state = { zarizeniExpanded: false, nepiOpyExpanded: false }
    this.expandZarizeni = this.expandZarizeni.bind(this)
    this.expandNepiOp = this.expandNepiOp.bind(this)
  }

  expandNepiOp() {
    const { lokalita, fetchNepiOpy } = this.props
    if (!this.state.nepiOpyExpanded) {
      fetchNepiOpy(lokalita.id).then(() => this.setState({ nepiOpyExpanded: true }))
    } else {
      this.setState({ nepiOpyExpanded: false })
    }
  }

  expandZarizeni() {
    const { lokalita, fetchZarizeni } = this.props
    if (!this.state.zarizeniExpanded) {
      fetchZarizeni(lokalita.id).then(() => this.setState({ zarizeniExpanded: true }))
    } else {
      this.setState({ zarizeniExpanded: false })
    }
  }

  render() {
    const { lokalita, zarizeni, nepiOpy } = this.props

    const nepiOpLabel = lokalita.nepiOpyCount === 0 ? (
      'žádný obchodní případ'
    ) : this.state.nepiOpyExpanded ? (
      `${nepiOpy.count()} obchodní případ(y)`
    ) : 'obchodní případy'

    const zarizeniLabel = !(lokalita.umistenaZarizeniCount > 0) ? (
      'žádná umístěná zařízení'
    ) : this.state.zarizeniExpanded ? (
      `${zarizeni.count()} zařízení`
    ) : 'umístěná zařízení'

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

        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={this.expandZarizeni}>
          {zarizeniLabel}
          <IconButton tooltip={this.state.zarizeniExpanded ? 'sbalit' : 'rozbalit'}>
            <MyIcon color={colors.green100}>{this.state.zarizeniExpanded ? 'expand_less' : 'expand_more'}</MyIcon>
          </IconButton>
        </div>
        <Panel collapsible expanded={this.state.zarizeniExpanded}>
          <UmistenaZarizeni umistenaZarizeni={zarizeni} />
        </Panel>

        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={this.expandNepiOp}>
          {nepiOpLabel}
          <IconButton tooltip={this.state.nepiOpyExpanded ? 'sbalit' : 'rozbalit'}>
            <MyIcon color={colors.green100}>{this.state.nepiOpyExpanded ? 'expand_less' : 'expand_more'}</MyIcon>
          </IconButton>
        </div>
        <Panel collapsible expanded={this.state.nepiOpyExpanded}>
          <NepiOpy nepiOpy={nepiOpy} size={10000} />
        </Panel>

      </div>
    )
  }
}
