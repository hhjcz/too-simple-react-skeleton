/**
 * Created by hhj on 12/23/15.
 */

import express from 'express'
import createLocation from 'history/lib/createLocation'
import React from 'react'
import {renderToString} from 'react-dom/server'
import {RoutingContext, match, Link} from 'react-router'
import {Provider} from 'react-redux'
import routes from './shared/routes'
import createStore from './redux'

const app = express()

app.use('/', express.static('dist', {maxAge: '200d'}));

app.use((req, res) => {
  const location = createLocation(req.url)
  const store = createStore()

  match({routes, location}, (err, redirectLocation, renderProps) => {

    if (err) {
      console.error(err)
      return res.status(500).end('Ajvaj, Internal server errooorrr')
    }

    if (!renderProps) return res.status(400).end('Ajvaj, Not fouuunddd')

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
      <title>Isomorphic Redux Demo</title>
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
    </body>
  </html>
  `;

    res.end(HTML)
  })
})

export default app
