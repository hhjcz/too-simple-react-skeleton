/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { List } from 'immutable'
import createMapStateToProps from '../lib/createMapStateToProps'
import createMapDispatchToProps from '../lib/createMapDispatchToProps'
import { getItems } from '../lib/rest'
import Paginator from '../lib/tabulka/Paginator'
import ColumnsControl from '../lib/tabulka/ColumnsControl'
import Tabulka from '../lib/tabulka/Tabulka'
import PredefinedViews from './PredefinedViews'
import * as actions from './actions'

export class Container extends React.Component {

  static propTypes = {
    columns: PropTypes.object.isRequired,
    fetching: PropTypes.bool,
    items: PropTypes.object,
    pagination: PropTypes.object.isRequired,
    sort: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired,
    generalParams: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    params: PropTypes.object,
    dispatch: PropTypes.func,
  };

  static defaultProps = {
    columns: {},
    actions: { udalost: {} },
    generalParams: List()
  };

  // server and client side fetch actions (see render.jsx & componentDidMount):
  static get fetchActions() {
    return [Container.fetchItems]
  }

  static fetchItems({ params }) {
    return actions.udalost.fetchCollection({ params })
  }

  constructor(props) {
    super(props)
    this.onFilterChange = this.onFilterChange.bind(this)
    this.onSortChange = this.onSortChange.bind(this)
    this.onNamedFilterChange = this.onNamedFilterChange.bind(this)
  }

  // browser fetching:
  componentDidMount() {
    Container.fetchActions.forEach(action => action({ params: this.props.params }))
  }

  onSortChange(sortField) {
    this.props.actions.udalost.sortChange(sortField)
  }

  /** @param {Filter} filter */
  onFilterChange(filter) {
    this.props.actions.udalost.filterChange(filter)
  }

  onNamedFilterChange(filterName) {
    this.props.actions.udalost.generalParamChange({ name: 'filter', value: filterName })
  }

  render() {
    const self = this
    const {
      columns,
      fetching,
      items,
      pagination,
      sort,
      filters,
      generalParams,
      actions
    } = this.props

    const columnsList = columns.toList()
      .filter(column => !column.disabled)
      .sortBy(column => column.position)

    return (
      <div id="udalost-list">
        <div className="row">
          <div className="col col-xs-8">
            <PredefinedViews
              onNamedFilterChange={self.onNamedFilterChange}
              namedFilter={generalParams.get('filter')}
              onFilterChange={self.onFilterChange}
              filters={filters}
              hideColumn={actions.hideColumn}
              showColumn={actions.showColumn}
              setColumnWidth={actions.setColumnWidth}
            />
          </div>
          <div className="col col-xs-3 col-xs-offset-1">
            <ColumnsControl columns={columnsList} setColumnVisibility={actions.setColumnVisibility} />
          </div>
        </div>
        <Tabulka
          columns={columnsList} items={items}
          sort={sort} fetching={fetching} filters={filters} pagination={pagination}
          onSortChange={self.onSortChange} onFilterChange={self.onFilterChange}
        />
        <Paginator
          pagination={pagination}
          onPageChange={actions.udalost.gotoPage}
          onPerPageChange={actions.udalost.setPageSize}
        />
      </div>
    )
  }
}

export default connect(
  createMapStateToProps(state => ({
    ...(state.resources.udalost.set('items', getItems(state.resources.udalost)).toObject()),
    ...(state.udalostList.toObject())
  })),
  createMapDispatchToProps(actions)
)(Container)