/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import createMapStateToProps from '../lib/createMapStateToProps'
import createMapDispatchToProps from '../lib/createMapDispatchToProps'
import createFetchWrapper from '../lib/rest/createFetchWrapper'
import * as actions from './actions'
import Tabulka from './Tabulka'
import Paginator from './Paginator'
import PredefinedViews from './PredefinedViews'

export class Container extends React.Component {

  static propTypes = {
    fetching: PropTypes.bool,
    items: PropTypes.object,
    pagination: PropTypes.object.isRequired,
    sort: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired,
    generalParams: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  // server and client side fetch actions (see render.jsx & componentDidMount):
  static fetchActions = [actions.fetchAll];

  // browser fetching:
  componentDidMount() {
    Container.fetchActions.forEach((action) => action({ projectToLocation: true }))
  }

  render() {
    const { fetching, items: seznamZarizeni, pagination, sort, filters, generalParams, dispatch } = this.props
    const onSortChange = function(sortField) {
      dispatch(actions.sortChange(sortField, true))
    }
    const onFilterChange = function(filter) {
      dispatch(actions.filterChange(filter, true))
    }
    const onGeneralParamChange = function(param) {
      dispatch(actions.generalParamChange(param))
    }

    return (
      <div id="zarizeni-list">
        {/* <h4>Seznam zařízení</h4>*/}
        <PredefinedViews onSortChange={onSortChange} onFilterChange={onFilterChange} onGeneralParamChange={onGeneralParamChange} namedFilter={generalParams.toObject()._filter} />
        <Tabulka
          seznamZarizeni={seznamZarizeni} sort={sort} fetching={fetching} filters={filters} pagination={pagination}
          onSortChange={onSortChange} onFilterChange={onFilterChange}
        />
        <Paginator
          pagination={pagination}
          onPageChange={function(page) {dispatch(actions.gotoPage(page, true))}}
          onPerPageChange={function(perPage) {dispatch(actions.setPageSize(perPage, true))}}
        />
      </div>
    )
  }
}

// TODO - not used for now, does not work
const WrappedContainer = createFetchWrapper(actions.getAll)(Container)

export default connect(
  createMapStateToProps(state => state.zarizeni),
  createMapDispatchToProps(actions)
)(Container)
