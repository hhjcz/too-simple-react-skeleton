/** Created by hhj on 1/29/16. */
import { getActionBasename } from './utils'
import { Pagination } from '../../zarizeni-list/pagination'
import { Sort } from '../../zarizeni-list/sort'
import { setList } from '../../zarizeni-list/core'

export default function createRestReducer(endpointName, config) {
  const actionBasename = getActionBasename(endpointName)

  return function reducer(state, action) {

    switch (action.type) {
      case `${actionBasename}_REQUEST`:
        return state
          .update('fetching', () => true)

      case `${actionBasename}_SUCCESS`:
        return setList(state, action.data)
          .set('fetching', false)
          .set('queryParams', action.meta.queryParams)
          .update('pagination', pagination =>
            action.meta.pagination
              ? new Pagination({ ...pagination, ...action.meta.pagination, })
              : pagination
          )
          .update('sort', sort =>
            action.meta.sort
              ? new Sort(action.meta.sort)
              : sort
          )

      case `${actionBasename}_ERROR`:
        return setList(state, [])
          .set('fetching', false)
          .set('queryParams', '')

      default:
        return state
    }
  }
}
