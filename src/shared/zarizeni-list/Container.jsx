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
    actions: PropTypes.object.isRequired,
  };

  static defaultProps = {};

  // server and client side fetch actions (see render.jsx & componentDidMount):
  static fetchActions = [actions.fetchAll];

  constructor(props) {
    super(props)
    this.onFilterChange = this.onFilterChange.bind(this)
    this.onSortChange = this.onSortChange.bind(this)
    this.onNamedFilterChange = this.onNamedFilterChange.bind(this)
  }

  // browser fetching:
  componentDidMount() {
    Container.fetchActions.forEach((action) => action({ projectToLocation: true }))
  }

  onSortChange(sortField) {
    this.props.actions.sortChange(sortField, true)
  }

  onFilterChange(filter) {
    this.props.actions.filterChange(filter, true)
  }

  onNamedFilterChange(filterName) {
    this.props.actions.generalParamChange({ name: '_filter', value: filterName })
  }

  render() {
    const self = this
    const { fetching, items: seznamZarizeni, pagination, sort, filters, generalParams, actions } = this.props

    return (
      <div id="zarizeni-list">
        <PredefinedViews onNamedFilterChange={self.onNamedFilterChange} namedFilter={generalParams.toObject()._filter} />
        <Tabulka
          seznamZarizeni={seznamZarizeni} sort={sort} fetching={fetching} filters={filters} pagination={pagination}
          onSortChange={self.onSortChange} onFilterChange={self.onFilterChange}
        />
        <Paginator
          pagination={pagination}
          onPageChange={function(page) {actions.gotoPage(page, true)}}
          onPerPageChange={function(perPage) {actions.setPageSize(perPage, true)}}
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
