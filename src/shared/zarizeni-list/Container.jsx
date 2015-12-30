/**
 * Created by hhj on 12/28/15.
 */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import createMapStateToProps from '../lib/createMapStateToProps'
import createMapDispatchToProps from '../lib/createMapDispatchToProps'
import createFetchWrapper from '../lib/createFetchWrapper'
import * as listActions from './actions'
import Tabulka from './Tabulka.jsx'
import Paginator from './Paginator'

class Container extends React.Component {

  static propTypes = {
    fetching: PropTypes.bool,
    seznamZarizeni: PropTypes.object,
    pagination: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    dispatch: PropTypes.func
  }

  // browser fetching:
  componentDidMount() {
    // [listActions.fetchList].forEach((action) => this.props.dispatch(action()))
  }

  // server side fetching (see server.jsx):
  static fetchActions = listActions.fetchList

  render() {
    const {actions, pagination, seznamZarizeni, fetching} = this.props
    return (
      <div id="zarizeni-list">
        <h2>Seznam zarizeni</h2>
        <Tabulka seznamZarizeni={seznamZarizeni.toList()} />
        <Paginator pagination={pagination} onPageChange={(page) => actions.gotoPage(page)} />
        {fetching ? 'Fetching...' : ''}
      </div>
    )
  }
}

// TODO - not used for now
const WrappedContainer = createFetchWrapper(listActions.fetchList)(Container) // eslint-disable-line no-unused-vars

export default connect(
  createMapStateToProps('zarizeniList'),
  createMapDispatchToProps(listActions)
)(Container)
