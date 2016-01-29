/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import createMapStateToProps from '../lib/createMapStateToProps'
import createMapDispatchToProps from '../lib/createMapDispatchToProps'
import createFetchWrapper from '../lib/fetch/createFetchWrapper'
import * as listActions from './actions'
import Tabulka from './Tabulka'
import Paginator from './Paginator'

export class Container extends React.Component {

  static propTypes = {
    fetching: PropTypes.bool,
    seznamZarizeni: PropTypes.object,
    pagination: PropTypes.object.isRequired,
    sort: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  // browser fetching:
  componentDidMount() {
    const { dispatch } = this.props
    Container.fetchActions.forEach((action) => dispatch(action()))
  }

  // server and client side fetch actions (see render.jsx & componentDidMount):
  static fetchActions = [listActions.fetchList];

  render() {
    const { fetching, seznamZarizeni, pagination, sort, filters, dispatch } = this.props
    return (
      <div id="zarizeni-list">
        <h4>Seznam zařízení</h4>
        <Tabulka
          seznamZarizeni={seznamZarizeni} sort={sort} fetching={fetching} filters={filters}
          onSortChange={function(sortField) {dispatch(listActions.sortChange(sortField))}}
          onFilterChange={function(filter) {dispatch(listActions.filterChange(filter))}}
        />
        <Paginator
          pagination={pagination}
          onPageChange={function(page) {dispatch(listActions.gotoPage(page))}}
          onPerPageChange={function(perPage) {dispatch(listActions.setPageSize(perPage))}}
        />
      </div>
    )
  }
}

// TODO - not used for now, does not work
const WrappedContainer = createFetchWrapper(listActions.fetchList)(Container)

export default connect(
  createMapStateToProps(state => state.zarizeniList),
  createMapDispatchToProps(listActions)
)(Container)
