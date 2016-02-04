/** Created by hhj on 12/23/15. */
import React from 'react'
import { Route, IndexRoute } from 'react-router'

import ZarizeniList from '../zarizeni-list/Container'
import Zarizeni from '../zarizeni/Container'
import NetvisionZarizeni from '../zarizeni/NetvisionZarizeni'
import Umisteni from '../umisteni/Umisteni'
import Ports from '../port/Ports'
import Port from '../port/Port'
import Hriste from './Hriste'
import App from './index'

export default (
  <Route name="app" component={App} path="/">
    <Route path="zarizeni">
      <IndexRoute component={ZarizeniList} />
      <Route path=":id">
        <IndexRoute component={Zarizeni} />
        <Route component={Umisteni} path="umisteni" />
        <Route component={NetvisionZarizeni} path="netvision" />
        <Route path="ports">
          <IndexRoute component={Ports} />
          <Route component={Port} path=":portId" />
        </Route>
      </Route>
    </Route>
    <Route path="hriste" component={Hriste} />
  </Route>
)
