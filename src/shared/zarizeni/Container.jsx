/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import createMapStateToProps from '../lib/createMapStateToProps'
import createMapDispatchToProps from '../lib/createMapDispatchToProps'
import * as actions from '../zarizeni-list/actions'
import Zarizeni from './Zarizeni'

export class Container extends React.Component {

  static propTypes = {
    fetching: PropTypes.bool,
    item: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object,
  };

  // browser fetching:
  componentDidMount() {
    const { dispatch, params } = this.props
    Container.fetchActions.forEach((action) => dispatch(action({ location: { search: `/${params.id}` } })))
  }

  // server and client side fetch actions (see render.jsx & componentDidMount):
  static fetchActions = [actions.getOne];

  render() {
    const { fetching, item, dispatch } = this.props
    return (
      <div id="zarizeni">
      </div>
    )
  }
}

export default connect(
  createMapStateToProps(state => state.zarizeni),
  createMapDispatchToProps(actions)
)(Container)