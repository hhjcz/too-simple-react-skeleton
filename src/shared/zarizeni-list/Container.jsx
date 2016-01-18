/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import humps from 'humps'

import createMapStateToProps from '../lib/createMapStateToProps'
import createMapDispatchToProps from '../lib/createMapDispatchToProps'
import createFetchWrapper from '../lib/createFetchWrapper'
import * as listActions from './actions'
import Tabulka from './Tabulka.jsx'
import Paginator from './Paginator'

export class Container extends React.Component {

  static propTypes = {
    fetching: PropTypes.bool,
    seznamZarizeni: PropTypes.object,
    pagination: PropTypes.object.isRequired,
    dispatch: PropTypes.func,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.object,
  };

  // browser fetching:
  componentDidMount() {
    const { dispatch, location, params } = this.props
    Container.fetchActions.forEach((action) => dispatch(action({ location, params })))
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      const { dispatch, location, params } = this.props
      Container.fetchActions.forEach((action) => dispatch(action({ location, params })))
    }
  }

  onPageChange(page) {
    const { history, location } = this.props
    if (location.query.page === '' + page) return
    history.push({ ...location, query: { ...location.query, page } })
  }

  onPerPageChange(perPage) {
    const { history, location } = this.props
    if (location.query.per_page === '' + perPage) return
    history.push({ ...location, query: { ...location.query, per_page: perPage } })
  }

  onSortChange(_sort) {
    let sort = humps.decamelize(_sort)
    const { history, location } = this.props
    if (location.query._sort === '' + sort) sort = '-' + sort
    history.push({ ...location, query: { ...location.query, _sort: sort } })
  }

  // server and client side fetch actions (see server.js & componentDidMount):
  static fetchActions = [listActions.fetchListByUrl];

  render() {
    const { pagination, seznamZarizeni, fetching, location } = this.props
    const sortBy = humps.camelize(location.query._sort || null)
    return (
      <div id="zarizeni-list">
        <h4>Seznam zařízení</h4>
        <Paginator pagination={pagination} onPageChange={this.onPageChange.bind(this) } onPerPageChange={this.onPerPageChange.bind(this)} />
        <Tabulka seznamZarizeni={seznamZarizeni} onSortChange={this.onSortChange.bind(this)} sortBy={sortBy} />
        {fetching ? 'Fetching...' : ''}
      </div>
    )
  }
}

// TODO - not used for now, does not work
const WrappedContainer = createFetchWrapper(listActions.fetchList)(Container) // eslint-disable-line no-unused-vars

export default connect(
  createMapStateToProps(state => state.zarizeniList),
  createMapDispatchToProps(listActions)
)(Container)
