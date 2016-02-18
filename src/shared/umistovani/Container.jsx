/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import qs from 'query-string'

import createMapStateToProps from '../lib/createMapStateToProps'
import createMapDispatchToProps from '../lib/createMapDispatchToProps'
import rest from '../app/rest'
import * as actions from './actions'
import Umistovani from './Umistovani'

export class Container extends React.Component {

  static propTypes = {
    zarizeni: PropTypes.object,
    umisteni: PropTypes.object,
    actions: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object,
  };

  static defaultProps = {
    zarizeni: {},
    umisteni: {},
  };

  // browser fetching:
  componentDidMount() {
    const { dispatch, location } = this.props
    Container.fetchActions.forEach(action => dispatch(action({ params: qs.parse(location.search) })))
  }

  static fetchZarizeni({ params }) {
    return rest.actions.zarizeni.fetchOne({
      params: { id: params.zarizeni_id },
      projectToLocation: false
    })
  }

  static fetchUmisteni({ params }) {
    return rest.actions.umisteni.fetchAll({
      params,
      projectToLocation: false
    })
  }

  // server and client side fetch actions (see render.jsx & componentDidMount):
  // static fetchActions = [actions.fetchAll];
  static get fetchActions() {
    return [Container.fetchZarizeni, Container.fetchUmisteni];
  }

  render() {
    const { zarizeni, umisteni, actions } = this.props
    return (
      <div id="zarizeni-list">
        <Umistovani zarizeni={zarizeni.item} seznamUmisteni={umisteni.items} actions={actions} />
        {zarizeni.fetching || umisteni.fetching ? <div className="text-info">Fetching...</div> : ''}
      </div>
    )
  }
}

export default connect(
  createMapStateToProps(state => state),
  createMapDispatchToProps(actions)
)(Container)
