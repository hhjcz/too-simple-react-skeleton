/** Created by hhj on 20.12.15. */
import humps from 'humps'
import { Map } from 'immutable'

export const SET_PAGINATION = 'SET_PAGINATION'
export const GOTO_PAGE = 'GOTO_PAGE'
export const SET_PAGE_SIZE = 'SET_PAGE_SIZE'
export const SORT_CHANGE = 'SORT_CHANGE'
export const FILTER_CHANGE = 'FILTER_CHANGE'

export const FETCH_LIST_REQUEST = 'FETCH_LIST_REQUEST'
export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS'
export const FETCH_LIST_ERROR = 'FETCH_LIST_ERROR'

const getSubState = (getState) => getState().zarizeniList

const fetchRequested = () => ({ type: FETCH_LIST_REQUEST })

const fetchSuccess = ({ response, queryParams }) => {

  const normalizeResponse = _response => {
    const normalizedResponse = humps.camelizeKeys(_response)
    normalizedResponse.data || (normalizedResponse.data = [])
    normalizedResponse.meta || (normalizedResponse.meta = {})
    if (normalizedResponse.meta.sort) {
      normalizedResponse.meta.sort = {
        dir: normalizedResponse.meta.sort.indexOf('-') > -1,
        by: humps.camelize(normalizedResponse.meta.sort || '')
      }
    }
    if (normalizedResponse.meta.pagination) {
      normalizedResponse.meta.pagination = {
        ...normalizedResponse.meta.pagination,
        page: normalizedResponse.meta.pagination.currentPage,
      }
    }

    return normalizedResponse
  }

  const normalizedResponse = normalizeResponse(response)
  normalizedResponse.meta.queryParams = queryParams

  return {
    type: FETCH_LIST_SUCCESS,
    ...normalizedResponse,
  }
}

const fetchError = ({ error }) => ({
  type: FETCH_LIST_ERROR,
  error
})


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
          reportError(`${response.status} ${response.statusText}`)
        }
        return response.json()  // parse json to object
      },
      error => {
        reportError(error)
      })
    .then(
      response => dispatch(fetchSuccess({ response, queryParams }))
    )

  function reportError(errorMessage) {
    const msg = `Ajaaj, chybka api: ${errorMessage}`
    dispatch(fetchError(msg))
    throw new Error(msg)
  }

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
 * @param location
 * @returns {Function}
 */
export function fetchList({ location } = {}) {

  const serializeQueryParams = getState => {
    const { pagination, sort, filters } = getSubState(getState).toObject()
    const { page, perPage } = pagination ? pagination : {};

    let pageString = ''
    if (page > 0) {
      pageString = `?page=${page}`
    }

    let perPageString = ''
    if (perPage > 0) {
      perPageString = `&per_page=${perPage}`
    }

    let sortString = ''
    if (sort && sort.by) {
      sortString = `&_sort=${sort.dir ? '-' : ''}${humps.decamelize(sort.by)}`
    }

    let filtersString = ''
    if (filters && filters.map && filters.size > 0) {
      filtersString = '&' + parseFilters(filters)
          .map(filter => `${filter.field}=${filter.value}`).toArray().join('&')
    }

    return `${pageString}${perPageString}${sortString}${filtersString}`
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
