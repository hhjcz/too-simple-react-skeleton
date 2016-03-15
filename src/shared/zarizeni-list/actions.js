/** Created by hhj on 20.12.15. */
import rest from '../app/rest';

export const SET_PAGINATION = 'SET_PAGINATION'
export const POINT_CURSOR_TO = 'POINT_CURSOR_TO'
export const GOTO_PAGE = 'GOTO_PAGE'
export const SET_PAGE_SIZE = 'SET_PAGE_SIZE'
export const SORT_CHANGE = 'SORT_CHANGE'
export const FILTER_CHANGE = 'FILTER_CHANGE'
export const GENERAL_PARAM_CHANGE = 'GENERAL_PARAM_CHANGE'

module.exports = {
  ...module.exports,
  ...rest.actions.zarizeni,
}

const { fetchAll, fetchOne } = rest.actions.zarizeni

const getSubState = getState => getState().zarizeni

/**
 * @param {number} cursorAt
 * @param {boolean} projectToLocation
 * @returns {Function}
 */
export function pointCursorTo(cursorAt, projectToLocation = false) {
  return ({ dispatch, getState }) => {

    const currentPage = getSubState(getState).pagination.page

    dispatch({
      type: POINT_CURSOR_TO,
      cursorAt
    })

    let promise
    if (true || currentPage !== getSubState(getState).pagination.page) promise = fetchAll({ projectToLocation })
    else promise = Promise.resolve(null)

    return promise
  }
}

/**
 * @param cursorAt
 * @param projectToLocation
 * @returns {Function}
 */
export function fetchOneAt(cursorAt, projectToLocation = false) {
  return ({ dispatch, getState }) => dispatch(pointCursorTo(cursorAt))
    .then(response => {
      const subState = getSubState(getState)
      const { page, perPage } = subState.pagination
      const item = subState.items.get(cursorAt - (page - 1) * perPage - 1)

      return fetchOne({ params: { id: item.id } })
    })
}

/**
 * @param {number} page
 * @param projectToLocation
 * @returns {Function}
 */
export function gotoPage(page, projectToLocation = false) {
  return ({ dispatch }) => {

    dispatch({
      type: GOTO_PAGE,
      page
    })

    return fetchAll({ projectToLocation })
  }
}

/**
 * @param {number} perPage
 * @param projectToLocation
 * @returns {Function}
 */
export function setPageSize(perPage, projectToLocation = false) {
  return ({ dispatch }) => {

    dispatch({
      type: SET_PAGE_SIZE,
      perPage
    })

    return fetchAll({ projectToLocation })
  }
}

/**
 * @param {string} sortField
 * @param projectToLocation
 * @returns {Function}
 */
export function sortChange(sortField, projectToLocation = false) {
  return ({ dispatch }) => {

    dispatch({
      type: SORT_CHANGE,
      sortField
    })

    return fetchAll({ projectToLocation })
  }
}

/**
 * @param {Filter} filter
 * @param projectToLocation
 * @returns {Function}
 */
export function filterChange(filter, projectToLocation = false) {
  return ({ dispatch }) => {
    dispatch({
      type: FILTER_CHANGE,
      filter
    })

    return fetchAll({ projectToLocation })
  }
}

/**
 * @param {Filter} filter
 * @param projectToLocation
 * @returns {Function}
 */
export function generalParamChange(paramObj, projectToLocation = false) {
  return ({ dispatch }) => {
    dispatch({
      type: GENERAL_PARAM_CHANGE,
      paramObj
    })

    return fetchAll({ projectToLocation })
  }
}
