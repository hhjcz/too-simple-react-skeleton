/** Created by hhj on 1/8/16. */

import createLocation from 'history/lib/createLocation'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import { Provider } from 'react-redux'
import Promise from 'bluebird'
import qs from 'query-string'

import routes from './../shared/app/routes'
import createStore from './../shared/app/createStore'
import rest from '../shared/app/rest'

export default function render(req, res, next) {
  const location = createLocation(req.url)
  const store = createStore()

  rest.use('dispatch', store.dispatch)

  match({ routes, location }, async(err, redirectLocation, renderProps) => {

    if (err) {
      console.error(err)
      return res.status(500).end('Ajvaj, Internal server errooorrr')
    }

    if (!renderProps) return res.status(400).end('Ajvaj, Not fouuunddd')

    try {
      await fetchAsyncData(store, renderProps)  // eslint-disable-line no-use-before-define
    } catch (e) {
      console.log(e)
      next(e)
    }

    let InitialComponent = (
      <Provider store={store}>
        <RoutingContext {...renderProps} />
      </Provider>
    )

    let initialState = store.getState()

    let componentHtml = renderToString(InitialComponent)

    // webpackIsomorphicTools defined globally in index.js
    let {
      javascript: { main: mainJsFilename },
      // style: { main: mainCssFilename }
    } = webpackIsomorphicTools.assets()
    let mainCssFilename = '/main.css'
    let mainCssLink = process.env.NODE_ENV === 'production'
      ? `<link rel="stylesheet" href="${mainCssFilename}">`
      : ''

    // TODO - extract HTML to separate react component
    let HTML = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Dohlestr using react/redux from scratch by hhj</title>
      ${mainCssLink}
      <!-- Bootstrap: latest compiled and minified CSS -->
      <!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">-->
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
      </script>
    </head>
    <body>
    <div>
      <div id="react-view">${componentHtml}</div>
      <script type="application/javascript" src="${mainJsFilename}"></script>
    </div>
    </body>
  </html>
  `;

    res.end(HTML)
  })
}

/**
 * Fetch data by dispatching actions defined by static property fetchActions on react components
 */
async function fetchAsyncData(store, { components, location, params }) {
  const fetchActions = components.reduce((actions, component) => {
    if (!component) return actions
    return actions
      .concat(component.fetchActions || [])
    // .concat(component.WrappedComponent ? component.WrappedComponent.fetchActions || [] : [])
  }, [])
  const queryParams = { ...qs.parse(location.search), ...params }
  const promises = fetchActions.map(action => action({
    params: queryParams,
    dispatch: store.dispatch,
    getState: store.getState
  }))

  await Promise.all(promises)
}
