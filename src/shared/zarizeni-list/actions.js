/** Created by hhj on 20.12.15. */
import rest from '../app/rest';

export const SET_PAGINATION = 'SET_PAGINATION'
export const POINT_CURSOR_TO = 'POINT_CURSOR_TO'
export const GOTO_PAGE = 'GOTO_PAGE'
export const SET_PAGE_SIZE = 'SET_PAGE_SIZE'
export const SORT_CHANGE = 'SORT_CHANGE'
export const FILTER_CHANGE = 'FILTER_CHANGE'

module.exports = {
  ...module.exports,
  ...rest.actions.zarizeni,
}

const { fetchAll } = rest.actions.zarizeni

/**
 * @param {number} cursorAt
 * @param {boolean} projectToLocation
 * @returns {Function}
 */
export function pointCursorTo(cursorAt, projectToLocation = false) {
  return ({ dispatch }) => {

    dispatch({
      type: POINT_CURSOR_TO,
      cursorAt
    })

    fetchAll({ projectToLocation })
  }
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

    fetchAll({ projectToLocation })
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

    fetchAll({ projectToLocation })
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

    fetchAll({ projectToLocation })
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

    fetchAll({ projectToLocation })
  }
}
