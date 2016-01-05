/** Created by hhj on 12/23/15. */
import React from 'react'
import { Route, IndexRoute } from 'react-router'

import ZarizeniList from '../zarizeni-list/Container.jsx'
import Zarizeni from '../zarizeni/Zarizeni.jsx'
import App from './index'

export default (
  <Route name="app" component={App} path="/">
    <Route path="zarizeni">
      <IndexRoute component={ZarizeniList} />
      <Route component={Zarizeni} path=":id" />
    </Route>
  </Route>
)
