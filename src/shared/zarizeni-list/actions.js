/** Created by hhj on 20.12.15. */
import { actions as restActions } from '../app/rest';

export const SET_PAGINATION = 'SET_PAGINATION'
export const GOTO_PAGE = 'GOTO_PAGE'
export const SET_PAGE_SIZE = 'SET_PAGE_SIZE'
export const SORT_CHANGE = 'SORT_CHANGE'
export const FILTER_CHANGE = 'FILTER_CHANGE'

const { getAll, getOne } = restActions.zarizeni

module.exports = {
  ...module.exports,
  ...restActions.zarizeni,
  getAll,
  getOne,
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

    dispatch(getAll())
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

    dispatch(getAll())
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

    dispatch(getAll())
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
    dispatch(getAll())
  }
}
