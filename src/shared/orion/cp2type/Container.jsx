/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { List, Map } from 'immutable'
import { reduxUtils } from '@hhjcz/js-lib'
import { getItems } from '@hhjcz/redux-rest'
import { Pagination } from '@hhjcz/redux-rest/lib/Pagination'
import { Sort } from '@hhjcz/redux-rest/lib/Sort'
import Paginator from '@hhjcz/react-lib/lib/tabulka/Paginator'
import ColumnsControl from '@hhjcz/react-lib/lib/tabulka/ColumnsControl'
import Tabulka from '@hhjcz/react-lib/lib/tabulka/Tabulka'
import PredefinedViews from './PredefinedViews'
import * as actions from './actions'

export class Container extends React.Component {

  static propTypes = {
    columns: PropTypes.object.isRequired,
    fetching: PropTypes.bool,
    items: PropTypes.object,
    sort: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired,
    generalParams: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    params: PropTypes.object,
    dispatch: PropTypes.func,
  };

  static defaultProps = {
    columns: {},
    items: List(),
    actions: { cp2type: {} },
    generalParams: List()
  };

  // server and client side fetch actions (see render.jsx & componentDidMount):
  static get fetchActions() {
    return [Container.fetchItems]
  }

  static fetchItems({ params }) {
    return actions.cp2type.fetchCollection({ params })
  }

  constructor(props) {
    super(props)
    this.onFilterChange = this.onFilterChange.bind(this)
    this.onSortChange = this.onSortChange.bind(this)
    this.state = { page: 1, perPage: 10, sort: new Sort({ by: 'autoAssign', dir: false }), filters: new Map() }
  }

  // browser fetching:
  componentDidMount() {
    Container.fetchActions.forEach(action => action({ params: this.props.params }))
  }

  onSortChange(sortField) {
    const state = this.state
    let newSort
    if (state.sort.by !== sortField) {
      newSort = new Sort({ dir: true, by: sortField })
    } else if (state.sort.dir === true) {
      newSort = new Sort({ dir: false, by: sortField })
    } else {
      newSort = new Sort()
    }
    this.setState({ sort: newSort })
  }

  /** @param {Filter} filter */
  onFilterChange(filter) {
    if (filter.value === '' || filter.value === null) {
      this.setState({ filters: this.state.filters.delete(filter.name) })
    }
    this.setState({ filters: this.state.filters.set(filter.name, filter) })
  }

  render() {
    const self = this
    const {
      columns,
      fetching,
      items,
      filters,
      generalParams,
      actions
    } = this.props

    const columnsList = columns.toList()
      .filter(column => !column.disabled)
      .sortBy(column => column.position)

    let sortedItems = items.sortBy(item => item[this.state.sort.by])
    sortedItems = this.state.sort.dir ? sortedItems.reverse() : sortedItems

    const filteredItems = sortedItems.filter(item =>
      this.state.filters.reduce((keep, filter) =>
        keep && (filter.value === '' || `${item[filter.name]}`.toLowerCase().indexOf(filter.value.toLowerCase()) > -1),
        true
      )
    )

    const pagination = new Pagination({
      page: this.state.page,
      perPage: this.state.perPage,
      total: filteredItems.count(),
      totalPages: Math.ceil(filteredItems.count() / this.state.perPage),
    })

    const paginatedItems = filteredItems
      .slice(
        (pagination.page - 1) * pagination.perPage,
        ((pagination.page - 1) * pagination.perPage) + pagination.perPage
      )

    return (
      <div id="cp2type-list">
        <div className="row">
          <div className="col col-md-6">
            <PredefinedViews
              namedFilter={generalParams.get('filter')}
              onFilterChange={self.onFilterChange}
              filters={filters}
              hideColumn={actions.hideColumn}
              showColumn={actions.showColumn}
              setColumnWidth={actions.setColumnWidth}
            />
          </div>
          <div className="col col-md-6">
            <Paginator
              pagination={pagination}
              onPageChange={function(page) { self.setState({ page }) }}
            />
          </div>
        </div>
        <Tabulka
          columns={columnsList} items={paginatedItems}
          sort={self.state.sort} fetching={fetching} filters={this.state.filters} pagination={pagination}
          onRowCountChange={function(perPage) { self.setState({ perPage }) }}
          onSortChange={self.onSortChange} onFilterChange={self.onFilterChange}
          setColumnVisibility={actions.setColumnVisibility}
        />
      </div>
    )
  }
}

export default connect(
  reduxUtils.createMapStateToProps(state => ({
    ...(state.resources.cp2type.set('items', getItems(state.resources.cp2type)).toObject()),
    ...(state.cp2typeList.toObject())
  })),
  reduxUtils.createMapDispatchToProps(actions)
)(Container)
