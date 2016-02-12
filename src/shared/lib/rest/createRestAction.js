/** Created by hhj on 1/29/16. */
import createResource from './createResource'
import { getSubState } from './utils'

export default function createRestAction(endpointName, config, actionCreators, fetchHolder) {
  const getThisSubState = getSubState(endpointName)

// projects state variables to window location (via history),
// so that on page reload it can be used on server for initial state
  const projectStateToLocation = (history, search) => {
    history.push({ pathname: window.location.pathname, search })
  }

  const resource = createResource(endpointName, config, fetchHolder)

  const createAction = actionName => {
    const subActionCreators = {
      requested: actionCreators[`${actionName}Requested`],
      success: actionCreators[`${actionName}Success`],
      error: actionCreators[`${actionName}Error`],
    }

    /* eslint-disable arrow-body-style */
    return ({ location, params, projectToLocation } = {}) => {
      if (projectToLocation == null) projectToLocation = false // eslint-disable-line

      return ({ dispatch, getState, history }) => {

        const state = getThisSubState(getState)
        const { url, queryString, run } = resource[actionName]({ location, params, state })
        if (state.lastFetchMark === url) return null // no need to refetch
        if (history && projectToLocation) projectStateToLocation(history, queryString)

        dispatch(subActionCreators.requested())

        return run()
          .then(response => dispatch(subActionCreators.success(response)))
          .catch(error => {
            const errorMessage = `Ajaaj, chybka api: ${error}`
            dispatch(subActionCreators.error({ errorMessage }))
            console.log(errorMessage)
            throw new Error(errorMessage)
          })
      }
    }
  }

  const fetchAll = createAction('fetchAll')
  const fetchOne = createAction('fetchOne')

  return {
    fetchAll,
    fetchOne,
  }
}
