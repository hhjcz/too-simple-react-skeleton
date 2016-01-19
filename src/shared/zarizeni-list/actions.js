/** Created by hhj on 20.12.15. */
import fetch from 'isomorphic-fetch'
import humps from 'humps'

export const SET_PAGINATION = 'SET_PAGINATION'
export const GOTO_PAGE = 'GOTO_PAGE'
export const SET_PAGE_SIZE = 'SET_PAGE_SIZE'
export const SORT_CHANGE = 'SORT_CHANGE'

export const SET_LIST = 'SET_LIST'
export const FETCH_LIST_REQUEST = 'FETCH_LIST_REQUEST'
export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS'
export const FETCH_LIST_ERROR = 'FETCH_LIST_ERROR'

const getSubState = (getState) => getState().zarizeniList

export function fetchRequested() {
  return {
    type: FETCH_LIST_REQUEST
  }
}

export function fetchSuccess({ response, queryParams }) {
  const camelResponse = humps.camelizeKeys(response)
  return {
    type: FETCH_LIST_SUCCESS,
    seznamZarizeni: camelResponse.data,
    pagination: camelResponse.meta.pagination,
    sort: {
      dir: camelResponse.meta.sort.indexOf('-') > -1,
      by: humps.camelize(camelResponse.meta.sort)
    },
    queryParams
  }
}

export function fetchError({ error }) {
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
const fetchFromApi = ({ queryParams, dispatch }) => {

  dispatch(fetchRequested())

  return fetch(`http://netvision-test:8089/api/zarizeni${queryParams}`)
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

/**
 * Projects state variables to url, so that on page reload, it can be used on server for initial state
 *
 * @param history
 * @param search
 */
const projectStateToUrl = (history, search) => {
  history.push({ pathname: window.location.pathname, search })
}

/**
 * @returns {Function}
 */
export function fetchList({ location } = {}) {
  const serializeQueryParams = getState => {
    const { pagination: { page, perPage }, sort } = getSubState(getState).toObject()
    const _sort = sort.by ? '&_sort=' + (sort.dir ? '-' : '') + humps.decamelize(sort.by) : ''
    return `?page=${page}&per_page=${perPage}${_sort}`
  }

  return (dispatch, getState, history) => {
    // on server, get (initial) query from url (via location), on client from state
    const queryParams = location ? location.search : serializeQueryParams(getState)
    const previousQueryParams = getSubState(getState).queryParams
    if (previousQueryParams === queryParams) return null // no need to refetch

    if (history) projectStateToUrl(history, queryParams)

    return fetchFromApi({ queryParams, dispatch, getState })
  }
}

/**
 * @param page
 * @returns {Function}
 */
export function gotoPage(page) {
  return dispatch => {

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
  return dispatch => {

    dispatch({
      type: SET_PAGE_SIZE,
      perPage
    })

    dispatch(fetchList())
  }
}

export function sortChange(sortField) {
  return dispatch => {

    dispatch({
      type: SORT_CHANGE,
      sortField
    })

    dispatch(fetchList())
  }

}
