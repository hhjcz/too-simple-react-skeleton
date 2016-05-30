/** Created by hhj on 12/23/15. */
/* eslint-disable import/no-named-as-default */
import React from 'react'
import { Route, IndexRoute } from 'react-router'

import ZarizeniList from '../zarizeni-list/Container'
import Zarizeni from '../zarizeni/Container'
import NetvisionZarizeni from '../zarizeni/NetvisionZarizeni'
import Umistovani from '../umistovani/Container'
import PortyZarizeni from '../port/PortyZarizeni'
import PortZarizeni from '../port/PortZarizeni'
import LokalitaList from '../lokalita-list/Container'
import Lokalita from '../lokalita-detail/Container'
import UdalostList from '../udalost-list/Container'
import Hriste from './Hriste'
import App from './index'

export default (
  <Route name="app" component={App} path="/">
    <Route path="zarizeni">
      <IndexRoute component={ZarizeniList} />
      <Route path=":id">
        <IndexRoute component={Zarizeni} />
        <Route component={NetvisionZarizeni} path="netvision" />
        <Route path="ports">
          <IndexRoute component={PortyZarizeni} />
          <Route component={PortZarizeni} path=":portId" />
        </Route>
      </Route>
    </Route>
    <Route path="umistovani">
      <IndexRoute component={Umistovani} />
      <Route path=":cursorAt" component={Umistovani} />
    </Route>
    <Route path="lokalita">
      <IndexRoute component={LokalitaList} />
      <Route path=":id">
        <IndexRoute component={Lokalita} />
      </Route>
    </Route>
    <Route path="udalost">
      <IndexRoute component={UdalostList} />
    </Route>
    <Route path="hriste" component={Hriste} />
  </Route>
)
