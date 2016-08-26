/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { List, Map } from 'immutable'
import { reduxUtils } from '@hhjcz/js-lib'
import { getItems } from '@hhjcz/redux-rest'
import Tabulka, { Paginator } from '@hhjcz/react-lib/lib/tabulka'
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
    location: PropTypes.object,
    dispatch: PropTypes.func,
  };

  static defaultProps = {
    columns: Map(),
    actions: {},
    generalParams: List()
  };

  // server and client side fetch actions (see render.jsx & componentDidMount):
  static get fetchActions() {
    return [Container.fetchZarizeni]
  }

  static fetchZarizeni({ params, getState }) {
    // if on server -> initial fetch of ids
    // TODO - when on server, test whether ids is empty, then also fetch
    const idsFetched = getState || true ? actions.fetchIds({ params }) : Promise.resolve(null)
    return idsFetched.then(() => actions.fetchCollectionByIds({ params }))
  }

  constructor(props) {
    super(props)
    this.onFilterChange = this.onFilterChange.bind(this)
    this.onSortChange = this.onSortChange.bind(this)
    this.onNamedFilterChange = this.onNamedFilterChange.bind(this)
  }

  // browser fetching:
  componentDidMount() {
    Container.fetchActions.forEach(action => action({ params: { ...this.props.params, ...this.props.location.query } }))
  }

  onSortChange(sortField) {
    this.props.actions.sortChange(sortField)
  }

  /** @param {Filter} filter */
  onFilterChange(filter) {
    this.props.actions.filterChange(filter)
  }

  onNamedFilterChange(filterName) {
    this.props.actions.generalParamChange({ name: 'filter', value: filterName })
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
      <div id="zarizeni-list">
        <div className="row">
          <div className="col col-md-6">
            <PredefinedViews
              filters={filters}
              onFilterChange={self.onFilterChange}
              namedFilter={generalParams.get('filter')}
              onNamedFilterChange={self.onNamedFilterChange}
              hideColumn={actions.hideColumn}
              showColumn={actions.showColumn}
              setColumnWidth={actions.setColumnWidth}
            />
          </div>
          <div className="col col-md-6">
            <Paginator
              pagination={pagination}
              onPageChange={actions.gotoPage}
              maxButtons={6}
            />
          </div>
        </div>
        <Tabulka
          columns={columnsList}
          items={items} sort={sort}
          fetching={fetching} filters={filters} pagination={pagination}
          onRowCountChange={actions.setPageSize}
          onSortChange={self.onSortChange} onFilterChange={self.onFilterChange}
          setColumnVisibility={actions.setColumnVisibility}
        />
      </div>
    )
  }
}

export default connect(
  reduxUtils.createMapStateToProps(state => ({
    ...(state.resources.zarizeni.set('items', getItems(state.resources.zarizeni)).toObject()),
    ...(state.zarizeniList.toObject())
  })),
  reduxUtils.createMapDispatchToProps(actions)
)(Container)
