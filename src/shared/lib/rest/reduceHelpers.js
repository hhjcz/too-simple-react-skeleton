/** Created by hhj on 4/12/16. */
import Immutable, { List, Record, Map } from 'immutable'
import { Pagination } from '../../app/models/Pagination'
import { Sort } from '../../app/models/Sort'

export const InitialState = Record({
  fetching: false,
  lastFetchSignature: { fetchCollection: null, fetchOne: null },
  ids: List(),
  items: List(),
  item: {},
  pagination: new Pagination(),
  sort: new Sort(),
  filters: Map(),
  generalParams: Map(),
})

// Note how JSON from server is revived to immutable record.
export const revive = (state = {}, initialState = new InitialState({}), itemTransformer) => {
  const { fetching, lastFetchSignature, ids, items, item, pagination, sort, filters, generalParams } = state
  const mergeObj = {
    fetching,
    lastFetchSignature,
  }
  if (ids) mergeObj.ids = List(ids)
  if (items) mergeObj.items = List(items).map(itemTransformer)
  if (item) mergeObj.item = itemTransformer(item)
  if (pagination) mergeObj.pagination = new Pagination(pagination)
  if (sort) mergeObj.sort = new Sort(sort)
  if (filters) mergeObj.filters = Map(filters)
  if (generalParams) mergeObj.generalParams = Map(generalParams)

  return initialState.merge(mergeObj);
}

export const itemsReducer = (items = [], itemTransformer = x => x) => state => state.set('items', List(items).map(itemTransformer))

export const idsReducer = (items = [], itemTransformer = x => x) => state => state.set('ids', Immutable.fromJS(items).map(item => item.get('id')))

export const itemReducer = (item = {}, itemTransformer = x => x) => state => state.set('item', itemTransformer(item))

export const fetchingReducer = fetching => state => state.set('fetching', fetching)

export const lastFetchSignatureReducer = (nextFetchSignature, actionType) => state => state.update('lastFetchSignature', lastFetchSignature => ({
  ...lastFetchSignature,
  [actionType]: nextFetchSignature
}))

export const sortReducer = nextSort => state => state.update('sort', sort => (nextSort ? new Sort(nextSort) : sort))

export const paginationReducer = nextPagination => state => state.update(
  'pagination', pagination => (nextPagination ? new Pagination({ ...pagination.toObject(), ...nextPagination }) : pagination)
)

export const idsPaginationReducer = nextPagination => state => state.update('pagination', pagination =>
  (nextPagination ? new Pagination({
    ...pagination.toObject(),
    total: nextPagination.total,
    totalPages: Math.ceil(nextPagination.total / pagination.toObject().perPage)
  }) : pagination)
)
