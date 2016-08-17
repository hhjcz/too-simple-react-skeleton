/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import createMapStateToProps from 'react-lib/lib/createMapStateToProps'
import createMapDispatchToProps from 'react-lib/lib/createMapDispatchToProps'
import { getItem, getItems } from 'react-lib/lib/rest'
import * as actions from './actions'
import LokalitaDetail from './LokalitaDetail'

export class Container extends React.Component {

  static propTypes = {
    params: PropTypes.object,
    lokalitaResource: PropTypes.object,
    zarizeniNaLokaliteResource: PropTypes.object,
    nepiOpyNaLokaliteResource: PropTypes.object,
    actions: PropTypes.object,
  };

  static defaultProps = {
    lokalitaResource: {},
    zarizeniNaLokaliteResource: {},
    nepiOpyNaLokaliteResource: {},
  };

  // server and client side fetch actions (see render.jsx & componentDidMount):
  static fetchActions = [actions.lokalita.fetchOne];

  constructor(props) {
    super(props)
    this.fetchZarizeni = this.fetchZarizeni.bind(this)
    this.fetchNepiOpy = this.fetchNepiOpy.bind(this)
  }

  // browser fetching:
  componentDidMount() {
    const { params } = this.props
    Container.fetchActions.forEach((action) => action({
      params: {
        ...params,
        include: 'nepi_opy_count,umistena_zarizeni_count'
      }
    }))
  }

  fetchZarizeni(lokalitaId) {
    return this.props.actions.zarizeniNaLokalite.fetchCollection({ params: { lokalita: lokalitaId } })
  }

  fetchNepiOpy(lokalitaId) {
    return this.props.actions.nepiOpyNaLokalite.fetchCollection({ params: { lokalita: lokalitaId } })
  }

  render() {
    const lokalita = getItem(this.props.lokalitaResource)
    const zarizeni = getItems(this.props.zarizeniNaLokaliteResource)
    const nepiOpy = getItems(this.props.nepiOpyNaLokaliteResource)

    return (
      <div id="lokalita-detail">
        <LokalitaDetail
          lokalita={lokalita}
          fetchZarizeni={this.fetchZarizeni} zarizeni={zarizeni}
          fetchNepiOpy={this.fetchNepiOpy} nepiOpy={nepiOpy}
        />
      </div>
    )
  }
}

export default connect(
  createMapStateToProps(state => ({
    lokalitaResource: state.resources.lokalita,
    zarizeniNaLokaliteResource: state.resources.zarizeniNaLokalite,
    nepiOpyNaLokaliteResource: state.resources.nepiOpyNaLokalite,
  })),
  createMapDispatchToProps(actions)
)(Container)
