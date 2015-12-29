/**
 * Created by hhj on 20.12.15.
 */
import fetch from 'isomorphic-fetch'

export const SET_PAGINATION = 'SET_PAGINATION'
export const GOTO_PAGE = 'GOTO_PAGE'
export const NEXT_PAGE = 'NEXT_PAGE'
export const PREVIOUS_PAGE = 'PREVIOUS_PAGE'

export const SET_LIST = 'SET_LIST'
export const FETCH_LIST_REQUEST = 'FETCH_LIST_REQUEST'
export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS'
export const FETCH_LIST_ERROR = 'FETCH_LIST_ERROR'

export function gotoPage(page) {
  return {
    type: GOTO_PAGE,
    page: page
  }
}

export function requestList() {
  return {
    type: FETCH_LIST_REQUEST
  }
}

export function receiveList(json) {
  return {
    type: FETCH_LIST_SUCCESS,
    seznamZarizeni: json.data,
    pagination: json.meta.pagination
  }
}

export function fetchList() {
  const parseQueryParams = (getState) => {
    console.log(getState())
    const {page, perPage} = getState().get('pagination').toObject()
    return `page=${page}&per_page=${perPage}`
  }

  return (dispatch, getState) => {
    dispatch(requestList())

    const queryParams = parseQueryParams(getState)
    return fetch(`http://netvision-test:8089/api/zarizeni?${queryParams}`)
      .then(response => response.json(), error => {
        console.log(error)
      })
      .then(json => dispatch(receiveList(json)))
  }
}
