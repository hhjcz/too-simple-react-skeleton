/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { List } from 'immutable'
import createMapStateToProps from '../lib/createMapStateToProps'
import createMapDispatchToProps from '../lib/createMapDispatchToProps'
import { getItems } from '../lib/rest'
import * as actions from './actions'
import Tabulka from './Tabulka'
import Paginator from './Paginator'
import PredefinedViews from './PredefinedViews'

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
    const idsFetched = getState ? actions.fetchIds() : Promise.resolve(null)
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
    Container.fetchActions.forEach(action => action({ params: this.props.params }))
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
      items: seznamZarizeni,
      pagination,
      sort,
      filters,
      generalParams,
      actions
    } = this.props

    console.log(this.props)
    console.log(columns.toJS())

    return (
      <div id="zarizeni-list">
        <PredefinedViews
          onNamedFilterChange={self.onNamedFilterChange}
          namedFilter={generalParams.get('filter')}
          onFilterChange={self.onFilterChange}
          filters={filters}
          hideColumn={actions.hideColumn}
          showColumn={actions.showColumn}
        />
        <Tabulka
          columns={columns.toList()}
          seznamZarizeni={seznamZarizeni} sort={sort}
          fetching={fetching} filters={filters} pagination={pagination}
          onSortChange={self.onSortChange} onFilterChange={self.onFilterChange}
        />
        <Paginator
          pagination={pagination}
          onPageChange={actions.gotoPage}
          onPerPageChange={actions.setPageSize}
        />
      </div>
    )
  }
}

export default connect(
  createMapStateToProps(state => ({
    ...state.resources.zarizeni.set('items', getItems(state.resources.zarizeni)).toObject(),
    ...state.zarizeniList.toObject()
  })),
  createMapDispatchToProps(actions)
)(Container)
