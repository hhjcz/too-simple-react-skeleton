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

const { fetchIds, fetchCollectionByIds, fetchOne } = rest.actions.zarizeni

const getSubState = getState => getState().zarizeni
const updateCollection = (projectToLocation = false) => fetchIds().then(() => fetchCollectionByIds())

/**
 * @param {number} cursorAt
 * @param {boolean} projectToLocation
 * @param {boolean} force
 * @returns {Function}
 */
export function pointCursorTo(cursorAt, projectToLocation = false, force = false) {   // eslint-disable-line no-unused-vars
  return ({ dispatch, getState }) => {

    const currentPage = getSubState(getState).pagination.page

    dispatch({
      type: POINT_CURSOR_TO,
      cursorAt
    })

    return Promise.resolve(null)
  }
}

/**
 * @param cursorAt
 * @param projectToLocation
 * @param force
 * @returns {Function}
 */
export function fetchOneAt(cursorAt, projectToLocation = false, force = false) {

  return ({ dispatch, getState }) => dispatch(pointCursorTo(cursorAt, projectToLocation, force))
    .then(() => fetchIds())
    .then(() => {
      const subState = getSubState(getState)
      const id = subState.ids.get(cursorAt - 1) || 1
      return fetchOne({ params: { id }, force })
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


    return updateCollection(projectToLocation)
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

    return updateCollection(projectToLocation)
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

    return updateCollection(projectToLocation)
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

    return updateCollection(projectToLocation)
  }
}

/**
 * @param {object} paramObj
 * @param {boolean} projectToLocation
 * @returns {Function}
 */
export function generalParamChange(paramObj, projectToLocation = false) {
  return ({ dispatch }) => {
    dispatch({
      type: GENERAL_PARAM_CHANGE,
      paramObj
    })

    return updateCollection(projectToLocation)
  }
}
