/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import createMapStateToProps from '../lib/createMapStateToProps'
import createMapDispatchToProps from '../lib/createMapDispatchToProps'
import * as actions from './actions'
import Tabulka from './Tabulka'
import Paginator from './Paginator'
import PredefinedViews from './PredefinedViews'
// import createFetchWrapper from '../lib/rest/createFetchWrapper'

export class Container extends React.Component {

  static propTypes = {
    fetching: PropTypes.bool,
    items: PropTypes.object,
    entities: PropTypes.object,
    pagination: PropTypes.object.isRequired,
    sort: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired,
    generalParams: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    params: PropTypes.object,
    dispatch: PropTypes.func,
  };

  static defaultProps = {
    actions: {}
  };

  // server and client side fetch actions (see render.jsx & componentDidMount):
  static get fetchActions() {
    return [Container.fetchZarizeni]
  }

  static fetchZarizeni({ params }) {
    return actions.fetchIds({ params })
      .then(() => actions.fetchCollectionByIds({ params }))
  }

  constructor(props) {
    super(props)
    this.onFilterChange = this.onFilterChange.bind(this)
    this.onSortChange = this.onSortChange.bind(this)
    this.onNamedFilterChange = this.onNamedFilterChange.bind(this)
  }

  // browser fetching:
  componentDidMount() {
    Container.fetchActions.forEach(action => action({
      params: this.props.params,
      dispatch: this.props.dispatch,
      getState: () => this.props
    }))
  }

  onSortChange(sortField) {
    this.props.actions.sortChange(sortField, true)
  }

  /** @param {Filter} filter */
  onFilterChange(filter) {
    this.props.actions.filterChange(filter, true)
  }

  onNamedFilterChange(filterName) {
    this.props.actions.generalParamChange({ name: 'filter', value: filterName })
  }

  render() {
    const self = this
    const {
      fetching,
      items,
      entities,
      pagination,
      sort,
      filters,
      generalParams,
      actions
    } = this.props

    const entitiesObj = entities.toObject()
    const seznamZarizeni = items.map(item => entitiesObj[item] || {})

    return (
      <div id="zarizeni-list">
        <PredefinedViews
          onNamedFilterChange={self.onNamedFilterChange}
          namedFilter={generalParams.toObject().filter}
          onFilterChange={self.onFilterChange}
          filters={filters}
        />
        <Tabulka
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

// TODO - not used for now, does not work
// const WrappedContainer = createFetchWrapper(actions.getAll)(Container)

export default connect(
  createMapStateToProps(state => state.zarizeni),
  createMapDispatchToProps(actions)
)(Container)
