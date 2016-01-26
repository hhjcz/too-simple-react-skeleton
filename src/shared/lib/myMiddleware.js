/** Created by hhj on 1/19/16. */

/**
 * Inject dependencies and dispatch if function (like redux-thunk plus redux-inject together)
 * see createStore, client/index.jsx and server/render.jsx for usage
 *
 * @param deps
 * @returns {Function}
 */
// history is injected on client only (see createStore, client/index.jsx, server/render.jsx)
export default function myMiddleware(deps) {
  return ({ dispatch, getState }) => next => action => {
    return typeof action === 'function' ? action({ dispatch, getState, ...deps }) : next(action)
  }
}
