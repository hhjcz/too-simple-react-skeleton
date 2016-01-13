/** Created by hhj on 20.12.15. */
import fetch from 'isomorphic-fetch'
import humps from 'humps'

export const SET_PAGINATION = 'SET_PAGINATION'
export const GOTO_PAGE = 'GOTO_PAGE'
export const NEXT_PAGE = 'NEXT_PAGE'
export const PREVIOUS_PAGE = 'PREVIOUS_PAGE'

export const SET_LIST = 'SET_LIST'
export const FETCH_LIST_REQUEST = 'FETCH_LIST_REQUEST'
export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS'
export const FETCH_LIST_ERROR = 'FETCH_LIST_ERROR'

const getSubState = (getState) => getState().zarizeniList

export function requestList({ query }) {
  const pagination = {}
  if (query.page !== undefined) pagination.page = parseInt(query.page)
  if (query.per_page !== undefined) pagination.perPage = parseInt(query.per_page)
  return {
    type: FETCH_LIST_REQUEST,
    pagination
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

/**
 * @param location
 * @param params
 * @returns {Function}
 */
export function fetchListByUrl({ location, params }) {  // eslint-disable-line no-unused-vars
  return (dispatch, getState) => {   // eslint-disable-line no-unused-vars
    const previousQueryParams = getSubState(getState).queryParams
    const queryParams = location.search
    // need to refetch?
    if (previousQueryParams === queryParams) return null

    // dispatch({type: GOTO_PAGE, page: location.query.page})
    dispatch(requestList({ query: location.query || {} }))

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
}

/**
 * @deprecated
 * @returns {Function}
 */
export function fetchList() {
  const parseQueryParams = (getState) => {
    const { page, perPage } = getSubState(getState).get('pagination').toObject()
    return `page=${page}&per_page=${perPage}`
  }

  return (dispatch, getState) => {
    dispatch(requestList())

    const queryParams = parseQueryParams(getState)
    return fetch(`http://netvision-test:8089/api/zarizeni?${queryParams}`)
      .then(
        response => response.json(),  // parse json to object
        error => {
          console.log(error)
        })
      .then(response => dispatch(receiveList(response)))
  }
}

/**
 * @deprecated
 * @param page
 * @returns {Function}
 */
export function gotoPage(page) {
  return (dispatch) => {

    dispatch({
      type: GOTO_PAGE,
      page
    })

    dispatch(fetchList())
  }
}
