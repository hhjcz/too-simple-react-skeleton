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

export function requestList() {
  return {
    type: FETCH_LIST_REQUEST
  }
}

export function receiveList({ response, queryParams }) {
  const camelResponse = humps.camelizeKeys(response)
  return {
    type: FETCH_LIST_SUCCESS,
    seznamZarizeni: camelResponse.data,
    pagination: camelResponse.meta.pagination,
    queryParams
  }
}

export function fetchError({ error }) {
  return {
    type: FETCH_LIST_ERROR,
    error
  }
}

function fetchFromApi({ queryParams, dispatch, getState }) {
  const previousQueryParams = getSubState(getState).queryParams
  // need to refetch?
  if (previousQueryParams === queryParams) return null

  dispatch(requestList())

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
        dispatch(receiveList({ response, queryParams }))
      },
      error => {
        console.log(error)
      }
    )
}

/**
 * @param location
 * @param params
 * @returns {Function}
 */
export function fetchListByUrl({ location, params }) {  // eslint-disable-line no-unused-vars
  return (dispatch, getState) => {   // eslint-disable-line no-unused-vars
    const queryParams = location.search

    return fetchFromApi({ queryParams, dispatch, getState })
  }
}

/**
 * @returns {Function}
 */
export function fetchList() {
  const parseQueryParams = (getState) => {
    const { pagination: { page, perPage }, sort } = getSubState(getState).toObject()
    const _sort = (sort.dir ? '-' : '') + humps.decamelize(sort.by)
    return `?page=${page}&per_page=${perPage}&_sort=${_sort}`
  }

  return (dispatch, getState) => {
    const queryParams = parseQueryParams(getState)

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

export function sortChange(sort) {
  return dispatch => {

    dispatch({
      type: SORT_CHANGE,
      sort
    })

    dispatch(fetchList())
  }

}
