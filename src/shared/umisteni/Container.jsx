/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'

import createMapStateToProps from '../lib/createMapStateToProps'
import createMapDispatchToProps from '../lib/createMapDispatchToProps'
import rest from '../app/rest'
import * as actions from './actions'
import Umisteni from './Umisteni'

export class Container extends React.Component {

  static propTypes = {
    zarizeni: PropTypes.object,
    umisteni: PropTypes.object,
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
    Container.fetchActions.forEach(action => dispatch(action({ location })))
  }

  static fetchZarizeni({ location }) {
    rest.actions.zarizeni.fetchOne({
      params: { id: queryString.parse(location.search).zarizeni_id },
      projectToLocation: false
    })
  }

  // server and client side fetch actions (see render.jsx & componentDidMount):
  // static fetchActions = [actions.fetchAll];
  static get fetchActions() {
    return [Container.fetchZarizeni];
  }

  render() {
    const { zarizeni } = this.props
    return (
      <div id="zarizeni-list">
        <Umisteni zarizeni={zarizeni.item} />
      </div>
    )
  }
}

export default connect(
  createMapStateToProps(state => state),
  createMapDispatchToProps(actions)
)(Container)
