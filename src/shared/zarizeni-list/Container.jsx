/**
 * Created by hhj on 12/28/15.
 */

import React, { PropTypes } from 'react'
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
    dispatch: PropTypes.func,
    history: PropTypes.object,
    location: PropTypes.object,
    params: PropTypes.object,
  }

  // browser fetching:
  componentDidMount() {
    // [listActions.fetchList].forEach((action) => this.props.dispatch(action()))
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      const {actions, location, params} = this.props
      // console.log('Location in did update: ', location)
      // console.log('Previous location in did update: ', prevProps.location)
      actions.fetchListByUrl({ location, params })
    }
  }

  onPageChange(page) {
    const {history, location} = this.props
    if (location.query.page === '' + page) return
    history.push({ ...location, query: {...location.query, page} })
  }

  // server side fetching (see server.jsx):
  static fetchActions = listActions.fetchListByUrl

  render() {
    const {pagination, seznamZarizeni, fetching} = this.props
    return (
      <div id="zarizeni-list">
        <h2>Seznam zarizeni</h2>
        <Tabulka seznamZarizeni={seznamZarizeni} />
        <Paginator pagination={pagination} onPageChange={this.onPageChange.bind(this) } />
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
