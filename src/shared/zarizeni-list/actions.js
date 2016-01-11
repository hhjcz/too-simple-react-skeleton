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

export function requestList() {
  return {
    type: FETCH_LIST_REQUEST
  }
}

export function receiveList({ response, queryParams }) {
  return {
    type: FETCH_LIST_SUCCESS,
    seznamZarizeni: response.data,
    pagination: response.meta.pagination,
    queryParams
  }
}

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
        response => response.json(),  // parse json into object
        error => {
          console.log(error)
        })
      .then(response => dispatch(receiveList(response)))
  }
}

export function fetchListByUrl({ location, params }) {  // eslint-disable-line no-unused-vars
  return (dispatch, getState) => {   // eslint-disable-line no-unused-vars
    const previousQueryParams = getSubState(getState).queryParams
    const queryParams = location.search
    // need to refetch?
    if (previousQueryParams === queryParams) return null

    // dispatch({type: GOTO_PAGE, page: location.query.page})
    dispatch(requestList())

    return fetch(`http://netvision-test:8089/api/zarizeni${queryParams}`)
      .then(
        response => response.json(),  // parse json into object
        error => {
          console.log(error)
        })
      .then(response => dispatch(receiveList({ response: humps.camelizeKeys(response), queryParams }))
      )
  }
}

export function gotoPage(page) {
  return (dispatch) => {

    dispatch({
      type: GOTO_PAGE,
      page
    })

    dispatch(fetchList())
  }
}
