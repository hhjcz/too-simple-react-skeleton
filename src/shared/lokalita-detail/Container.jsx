/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import createMapStateToProps from '../lib/createMapStateToProps'
import createMapDispatchToProps from '../lib/createMapDispatchToProps'
import { getItem } from '../lib/rest'
import * as actions from '../lokalita-list/actions'
import LokalitaDetail from './LokalitaDetail'

export class Container extends React.Component {

  static propTypes = {
    params: PropTypes.object,
  };

  // server and client side fetch actions (see render.jsx & componentDidMount):
  static fetchActions = [actions.fetchOne];

  // browser fetching:
  componentDidMount() {
    const { params } = this.props
    Container.fetchActions.forEach((action) => action({ params: { ...params, include: 'nepi_opy_count,umistena_zarizeni_count,nepi_opy,umistena_zarizeni' } }))
  }

  render() {
    const lokalita = getItem(this.props)
    return (
      <div id="lokalita-detail">
        <LokalitaDetail lokalita={lokalita} />
      </div>
    )
  }
}

export default connect(
  createMapStateToProps(state => state.resources.lokalita),
  createMapDispatchToProps(actions)
)(Container)
