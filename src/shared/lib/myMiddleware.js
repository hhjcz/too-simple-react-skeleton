/** Created by hhj on 1/19/16. */

// history is injected on client only (see createStore, client/index.jsx, server/render.jsx)
export default function myMiddleware({ history }) {
  return ({ dispatch, getState }) => next => action => {
    return typeof action === 'function' ? action(dispatch, getState, history) : next(action)
  }
}
