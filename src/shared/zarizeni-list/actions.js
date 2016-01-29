/** Created by hhj on 20.12.15. */
import { serializeQueryParams, fetchFromApi } from '../lib/fetch/fetchHelpers'

export const SET_PAGINATION = 'SET_PAGINATION'
export const GOTO_PAGE = 'GOTO_PAGE'
export const SET_PAGE_SIZE = 'SET_PAGE_SIZE'
export const SORT_CHANGE = 'SORT_CHANGE'
export const FILTER_CHANGE = 'FILTER_CHANGE'

export const FETCH_LIST_REQUEST = 'FETCH_LIST_REQUEST'
export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS'
export const FETCH_LIST_ERROR = 'FETCH_LIST_ERROR'

const getSubState = getState => getState().zarizeniList

const fetchRequested = () => ({ type: FETCH_LIST_REQUEST })

const fetchSuccess = (response) => ({
  type: FETCH_LIST_SUCCESS,
  ...response,
})

const fetchError = (error) => ({
  type: FETCH_LIST_ERROR,
  error
})

/**
 * @param location
 * @returns {Function}
 */
export function fetchList({ location } = {}) {

  // projects state variables to url,
  // so that on page reload it can be used on server for initial state
  const projectStateToUrl = (history, search) => {
    history.push({ pathname: window.location.pathname, search })
  }

  return ({ dispatch, getState, history, fetch }) => {
    // on server, get (initial) query from url (via location), on client from state
    const queryParams = location
      ? location.search
      : serializeQueryParams(getSubState(getState).toObject())
    const previousQueryParams = getSubState(getState).queryParams
    if (previousQueryParams === queryParams) return null // no need to refetch

    if (history) projectStateToUrl(history, queryParams)

    const uri = '/zarizeni'
    const fetchCallbacks = { fetchRequested, fetchSuccess, fetchError }

    return fetchFromApi({ uri, queryParams, dispatch, fetch, fetchCallbacks })
  }
}

/**
 * @param {number} page
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
 * @param {number} perPage
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

/**
 * @param {string} sortField
 * @returns {Function}
 */
export function sortChange(sortField) {
  return ({ dispatch }) => {

    dispatch({
      type: SORT_CHANGE,
      sortField
    })

    dispatch(fetchList())
  }
}

/**
 * @param {Filter} filter
 * @returns {Function}
 */
export function filterChange(filter) {
  return ({ dispatch }) => {
    dispatch({
      type: FILTER_CHANGE,
      filter
    })
    dispatch(fetchList())
  }
}
