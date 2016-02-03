/** Created by hhj on 2/3/16. */
import { snakeCase, camelCase } from 'lodash'

const actionPrefix = '@@my-rest'

function addGroup(resource, group) {
  const upperResource = snakeCase(resource).toUpperCase()
  const upperGroup = snakeCase(group).toUpperCase()

  const actionTypes = ['Requested', 'Success', 'Error'].reduce(
    (result, key) => {
      const upperKey = key.toUpperCase()
      const type = `${actionPrefix}/${upperResource}_${upperGroup}_${upperKey}`
      const alias = `${group}${key}`
      /* eslint-disable no-param-reassign */
      result[type] = type
      result[alias] = type

      return result
    }, {})

  return actionTypes
}

/** @typedef  {{fetchAllRequested: string, fetchAllSuccess: string, fetchAllError: string}} ActionTypes */
/**
 * @param resource
 * @returns {ActionTypes}
 */
export function actionTypesFor(resource) {
  const actionTypes = ['fetchAll', 'fetchOne', 'create', 'update', 'delete'].reduce(
    (result, key) => ({
      ...result,
      ...addGroup(resource, key)
    }), {})

  return actionTypes
}

export default actionTypesFor