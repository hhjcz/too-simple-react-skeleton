/** Created by hhj on 12/30/15. */
import React, { PropTypes } from 'react'
import Panel from 'react-bootstrap/lib/Panel'
import IconButton from 'material-ui/IconButton'
import MyIcon from '../lib/MyIcon'
import colors from '../app/colors'
import { Lokalita } from '../app/models/Lokalita'
import NepiOpy from '../umistovani/NepiOpy'
import UmistenaZarizeni from '../lokalita-list/UmistenaZarizeni'
import MarkedLokalita from '../umistovani/MarkedLokalita'

export default class LokalitaDetail extends React.Component {
  static propTypes = {
    lokalita: PropTypes.instanceOf(Lokalita).isRequired,
    fetchZarizeni: PropTypes.func.isRequired,
    zarizeni: PropTypes.object,
    fetchNepiOpy: PropTypes.func.isRequired,
    nepiOpy: PropTypes.object,
  };

  constructor(props) {
    super(props)
    this.state = { zarizeniExpanded: false, nepiOpyExpanded: false }
  }

  render() {
    const self = this
    const { lokalita, zarizeni, fetchZarizeni, nepiOpy, fetchNepiOpy } = this.props

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


        <div style={{ display: 'flex', alignItems: 'center' }}>
          {lokalita.umistenaZarizeniCount} umístěných zařízení
          <IconButton
            tooltip={this.state.zarizeniExpanded ? 'sbalit' : 'rozbalit'}
            onTouchTap={function() {
              if (!self.state.zarizeniExpanded) {
                fetchZarizeni(lokalita.id).then(() => self.setState({ zarizeniExpanded: true }))
              } else {
                self.setState({ zarizeniExpanded: false })
              }
            }}
          >
            <MyIcon color={colors.green100}>{this.state.zarizeniExpanded ? 'expand_less' : 'expand_more'}</MyIcon>
          </IconButton>
        </div>
        <Panel collapsible expanded={this.state.zarizeniExpanded}>
          <UmistenaZarizeni umistenaZarizeni={zarizeni} />
        </Panel>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          {lokalita.nepiOpyCount} obchodních případů
          <IconButton
            tooltip={this.state.nepiOpyExpanded ? 'sbalit' : 'rozbalit'}
            onTouchTap={function() {
              if (!self.state.nepiOpyExpanded) {
                fetchNepiOpy(lokalita.id).then(() => self.setState({ nepiOpyExpanded: true }))
              } else {
                self.setState({ nepiOpyExpanded: false })
              }
            }}
          >
            <MyIcon color={colors.green100}>{this.state.nepiOpyExpanded ? 'expand_less' : 'expand_more'}</MyIcon>
          </IconButton>
        </div>
        <Panel collapsible expanded={this.state.zarizeniExpanded}>
          <NepiOpy nepiOpy={lokalita.nepiOpy} size={10} />
        </Panel>

      </div>
    )
  }
}
