/** Created by hhj on 20.12.15. */
import rest, { getSubState } from '../app/rest';
import handleError from '../lib/myErrorHandler'

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

const { fetchIds, fetchCollectionByIds, fetchOne } = rest.actions.zarizeni

const updateCollection = () => fetchIds().then(() => fetchCollectionByIds())

/**
 * @param cursorAt
 * @returns {Function}
 */
export function fetchOneAt(cursorAt) {
  return ({ dispatch, getState }) => {
    dispatch({ type: POINT_CURSOR_TO, cursorAt })

    const subState = getSubState('zarizeni')(getState)
    const id = subState.ids.get(cursorAt - 1)
    if (!id) handleError(`No valid zarizeni found at position ${cursorAt}`)

    return fetchOne({ params: { id } })
  }
}

/**
 * @param {number} page
 * @returns {Function}
 */
export function gotoPage(page) {
  return ({ dispatch }) => {
    dispatch({ type: GOTO_PAGE, page })
    return fetchCollectionByIds()
  }
}

/**
 * @param {number} perPage
 * @returns {Function}
 */
export function setPageSize(perPage) {
  return ({ dispatch }) => {
    dispatch({ type: SET_PAGE_SIZE, perPage })
    return updateCollection()
  }
}

/**
 * @param {string} sortField
 * @returns {Function}
 */
export function sortChange(sortField) {
  return ({ dispatch }) => {
    dispatch({ type: SORT_CHANGE, sortField })
    return updateCollection()
  }
}

/**
 * @param {Filter} filter
 * @returns {Function}
 */
export function filterChange(filter) {
  return ({ dispatch }) => {
    dispatch({ type: FILTER_CHANGE, filter })
    return updateCollection()
  }
}

/**
 * @param {object} paramObj
 * @returns {Function}
 */
export function generalParamChange(paramObj) {
  return ({ dispatch }) => {
    dispatch({ type: GENERAL_PARAM_CHANGE, paramObj })
    return updateCollection()
  }
}
