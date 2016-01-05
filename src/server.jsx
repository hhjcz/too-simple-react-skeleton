/** Created by hhj on 12/23/15. */
import express from 'express'
import createLocation from 'history/lib/createLocation'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { RoutingContext, match } from 'react-router'
import { Provider } from 'react-redux'
import Promise from 'bluebird'

import routes from './shared/app/routes'
import createStore from './shared/app/createStore'

const app = express()

app.use('/', express.static('dist', { maxAge: '200d' }));

app.use((req, res) => {
  const location = createLocation(req.url)
  const store = createStore()

  match({ routes, location }, async (err, redirectLocation, renderProps) => {

    if (err) {
      console.error(err)
      return res.status(500).end('Ajvaj, Internal server errooorrr')
    }

    if (!renderProps) return res.status(400).end('Ajvaj, Not fouuunddd')

    // TODO - server side async data fetch - how to retrieve static fetchActions from FetchWrapper?
    try {
      await fetchAsyncData(store.dispatch, renderProps)  // eslint-disable-line no-use-before-define
    } catch (e) {
      console.log(e)
      // next(e)
    }

    const InitialComponent = (
      <Provider store={store}>
        <RoutingContext {...renderProps} />
      </Provider>
    )

    const initialState = store.getState()

    const componentHtml = renderToString(InitialComponent)

    const HTML = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Dohlestr using react/redux from scratch by hhj</title>
      <!-- Bootstrap: latest compiled and minified CSS -->
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
      </script>
    </head>
    <body>
    <div>
      <div id="react-view">${componentHtml}</div>
      <script type="application/javascript" src="/bundle.js"></script>
    </div>
    </body>
  </html>
  `;

    res.end(HTML)
  })
})

async function fetchAsyncData(dispatch, { components, location, params }) { // eslint-disable-line no-unused-vars
  const fetchActions = components.reduce((actions, component) => {
    if (!component) return actions
    return actions
      .concat(component.fetchActions || [])
      // .concat(component.WrappedComponent ? component.WrappedComponent.fetchActions || [] : [])
  }, [])
  const promises = fetchActions.map(action => dispatch(action({ location, params })))

  await Promise.all(promises)
}

export default app
