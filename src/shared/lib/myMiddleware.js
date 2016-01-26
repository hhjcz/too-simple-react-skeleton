/** Created by hhj on 1/19/16. */

// history is injected on client only (see createStore, client/index.jsx, server/render.jsx)
export default function myMiddleware(deps) {
  return ({ dispatch, getState }) => next => action => {
    return typeof action === 'function' ? action({ dispatch, getState, ...deps }) : next(action)
  }
}
