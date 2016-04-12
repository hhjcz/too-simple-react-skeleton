/** Created by hhj on 1/29/16. */
/* eslint-disable max-len */
import { compose } from 'redux'
import {
  InitialState,
  revive,
  itemsReducer,
  idsReducer,
  itemReducer,
  fetchingReducer,
  lastFetchSignatureReducer,
  idsPaginationReducer,
  sortReducer
} from './reduceHelpers'


export default function createRestReducer(endpointName, config = {}, actionTypes = {}) {
  const itemTransformer = config.itemTransformer || (item => item)

  const initialState = new InitialState(config.defaultState || {})

  return function reducer(state = {}, action) {
    // Note how JSON from server is revived to immutable record.
    if (!(state instanceof InitialState)) {
      return revive(state, initialState, itemTransformer)
    }

    switch (action.type) {
      case actionTypes.fetchCollectionRequested:
      case actionTypes.fetchCollectionByIdsRequested:
      case actionTypes.fetchIdsRequested:
      case actionTypes.fetchOneRequested:
      case actionTypes.createRequested:
      case actionTypes.updateRequested:
        return fetchingReducer(true)(state)

      case actionTypes.fetchCollectionSuccess:
        return compose(
          itemsReducer(action.data, itemTransformer),
          fetchingReducer(false),
          lastFetchSignatureReducer(action.meta.lastFetchSignature, 'fetchCollection'),
          sortReducer(action.meta.sort),
          // paginationReducer(action.meta.pagination),
        )(state)

      case actionTypes.fetchCollectionByIdsSuccess:
        return compose(
          itemsReducer(action.data, itemTransformer),
          fetchingReducer(false),
          lastFetchSignatureReducer(action.meta.lastFetchSignature, 'fetchCollectionByIds'),
        )(state)

      case actionTypes.fetchIdsSuccess:
        return compose(
          idsReducer(action.data),
          fetchingReducer(false),
          lastFetchSignatureReducer(action.meta.lastFetchSignature, 'fetchIds'),
          idsPaginationReducer(action.meta.pagination),
        )(state)

      case actionTypes.fetchCollectionError:
        return compose(
          itemsReducer([]),
          fetchingReducer(false),
          lastFetchSignatureReducer('', 'fetchCollection')
        )(state)

      case actionTypes.fetchOneSuccess:
        return compose(
          itemReducer(action.data, itemTransformer),
          fetchingReducer(false),
          lastFetchSignatureReducer(action.meta.lastFetchSignature, 'fetchOne'),
        )(state)

      case actionTypes.fetchOneError:
        return compose(
          itemReducer({}),
          fetchingReducer(false),
          lastFetchSignatureReducer('', 'fetchOne')
        )(state)

      case actionTypes.createSuccess:
      case actionTypes.updateSuccess:
      case actionTypes.createError:
      case actionTypes.updateError:
        return fetchingReducer(false)(state)

      default:
        return state
    }
  }
}
