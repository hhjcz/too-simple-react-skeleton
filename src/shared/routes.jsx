/**
 * Created by hhj on 12/23/15.
 */

import React from 'react'
import {Route} from 'react-router'
import ZarizeniList from './zarizeni-list/Container.jsx'

import App from './app'

export default (
  <Route name="app" component={App} path="/">
    <Route component={ZarizeniList} path="zarizeni-list" />
  </Route>
)
