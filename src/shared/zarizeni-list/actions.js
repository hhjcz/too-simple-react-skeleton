/** Created by hhj on 20.12.15. */
import humps from 'humps'
import { Map } from 'immutable'

export const SET_PAGINATION = 'SET_PAGINATION'
export const GOTO_PAGE = 'GOTO_PAGE'
export const SET_PAGE_SIZE = 'SET_PAGE_SIZE'
export const SORT_CHANGE = 'SORT_CHANGE'
export const FILTER_CHANGE = 'FILTER_CHANGE'

export const SET_LIST = 'SET_LIST'
export const FETCH_LIST_REQUEST = 'FETCH_LIST_REQUEST'
export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS'
export const FETCH_LIST_ERROR = 'FETCH_LIST_ERROR'

const getSubState = (getState) => getState().zarizeniList

const fetchRequested = () => ({ type: FETCH_LIST_REQUEST })

const fetchSuccess = ({ response, queryParams }) => {
  const normalizeResponse = response => {
    const normalizedResponse = humps.camelizeKeys(response)
    normalizedResponse.meta || (normalizedResponse.meta = {})
    normalizedResponse.meta.pagination || (normalizedResponse.meta.pagination = {})
    normalizedResponse.meta.sort || (normalizedResponse.meta.sort = '')

    return normalizedResponse
  }

  const normResponse = normalizeResponse(response)

  return {
    type: FETCH_LIST_SUCCESS,
    seznamZarizeni: normResponse.data,
    pagination: normResponse.meta.pagination,
    sort: {
      dir: normResponse.meta.sort.indexOf('-') > -1,
      by: humps.camelize(normResponse.meta.sort)
    },
    queryParams
  }
}

const fetchError = ({ error }) => {
  return {
    type: FETCH_LIST_ERROR,
    error
  }
}

/**
 *
 * @param queryParams
 * @param dispatch
 * @returns {axios.Promise}
 */
const fetchFromApi = ({ queryParams, dispatch, fetch }) => {

  dispatch(fetchRequested())

  return fetch(`/zarizeni${queryParams}`)
    .then(
      response => {
        if (!response.ok) {
          const msg = `Ajaaj, chybka api: ${response.status} ${response.statusText}`
          dispatch(fetchError(msg))
          throw new Error(msg)
        }
        return response.json()  // parse json to object
      },
      error => {
        // console.log(error)
        const msg2 = `Ajeje, chybka api: ${error}`
        dispatch(fetchError(msg2))
        throw new Error(msg2)
      })
    .then(
      response => {
        dispatch(fetchSuccess({ response, queryParams }))
      },
      error => {
        console.log(error)
      }
    )
}

const parseFilters = filters => {

  const apiFilters = filters.map((filter, filterName) => {
    let suffix = '', value = ''
    const comparator = filter.comparator || 'contains'

    if (comparator === 'contains' && filter.value !== null) {
      suffix = '-lk';
      value = `%${filter.value}%`;
    } else if (comparator === 'begins' && filter.value !== null) {
      suffix = '-lk';
      value = `${filter.value}%`;
    } else if (comparator === 'empty' && filter.value === false) {
      suffix = '-not';
      value = '';
    } else if (comparator === 'empty' && filter.value === true) {
      suffix = '-null';
      value = '';
    } else if (filter.value !== null) {
      suffix = '';
      value = filter.value;
    } else return null

    return {
      field: filterName + suffix,
      value: encodeURIComponent(value)
    }
  })

  return apiFilters;
}

/**
 * @returns {Function}
 */
export function fetchList({ location } = {}) {

  const serializeQueryParams = getState => {
    const { pagination, sort, filters } = getSubState(getState).toObject()
    const { page, perPage } = pagination ? pagination : {};
    const _sort = sort ? (sort.by ? '&_sort=' + (sort.dir ? '-' : '') + humps.decamelize(sort.by) : '') : ''
    const filtersString = parseFilters(filters || Map())
      .map(filter => `${filter.field}=${filter.value}`).toArray().join('&')

    return `?page=${page}&per_page=${perPage}${_sort}&${filtersString}`
  }

  // projects state variables to url,
  // so that on page reload it can be used on server for initial state
  const projectStateToUrl = (history, search) => {
    history.push({ pathname: window.location.pathname, search })
  }

  return ({ dispatch, getState, history, fetch }) => {
    // on server, get (initial) query from url (via location), on client from state
    const queryParams = location ? location.search : serializeQueryParams(getState)
    const previousQueryParams = getSubState(getState).queryParams
    if (previousQueryParams === queryParams) return null // no need to refetch

    if (history) projectStateToUrl(history, queryParams)

    return fetchFromApi({ queryParams, dispatch, fetch })
  }
}

/**
 * @param page
 * @returns {Function}
 */
export function gotoPage(page) {
  return ({ dispatch }) => {

    dispatch({
      type: GOTO_PAGE,
      page
    })

    dispatch(fetchList())
  }
}

/**
 * @param perPage
 * @returns {Function}
 */
export function setPageSize(perPage) {
  return ({ dispatch }) => {

    dispatch({
      type: SET_PAGE_SIZE,
      perPage
    })

    dispatch(fetchList())
  }
}

export function sortChange(sortField) {
  return ({ dispatch }) => {

    dispatch({
      type: SORT_CHANGE,
      sortField
    })

    dispatch(fetchList())
  }
}

export function filterChange(filter) {
  return ({ dispatch }) => {
    dispatch({
      type: FILTER_CHANGE,
      filter
    })
    dispatch(fetchList())
  }
}
