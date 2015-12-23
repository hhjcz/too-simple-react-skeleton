/**
 * Created by hhj on 12/23/15.
 */

import express from 'express'
import createLocation from 'history/lib/createLocation'
import React from 'react'
import {renderToString} from 'react-dom/server'
import {RoutingContext, match} from 'react-router'
import routes from './shared/routes'

const app = express()

app.use((req, res) => {
  const location = createLocation(req.url)

  match({routes, location}, (err, redirectLocation, renderProps) => {

    if (err) {
      console.error(err)
      return res.status(500).end('Ajvaj, Internal server errooorrr')
    }

    if (!renderProps) return res.status(400).end('Ajvaj, Not fouuunddd')

    const InitialComponent = (
      <RoutingContext {...renderProps} />
    )

    const componentHtml = renderToString(InitialComponent)

    const HTML = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Isomorphic Redux Demo</title>
    </head>
    <body>
      <div id="react-view">${componentHtml}</div>
      <script type="application/javascript" src="/bundle.js"></script>
    </body>
  </html>
  `;

    res.end(HTML)
  })
})

export default app
