/** Created by hhj on 12/23/15. */
/* eslint-disable import/no-named-as-default */
import React from 'react'
import { Route, IndexRoute } from 'react-router'

import ZarizeniList from '../zarizeni-list/Container'
import Zarizeni from '../zarizeni/Container'
import ZarizeniInfo from '../zarizeni/info/Container'
import Umistovani from '../zarizeni/umistovani/Container'
import NetvisionZarizeni from '../zarizeni/info/NetvisionZarizeni'
import PortyZarizeni from '../port/PortyZarizeni'
import PortZarizeni from '../port/PortZarizeni'
import LokalitaList from '../lokalita-list/Container'
import Lokalita from '../lokalita-detail/Container'
import UdalostList from '../udalost-list/Container'
import Cp2TypeList from '../orion/cp2type/Container'
import Hriste from './Hriste'
import App from './index'

export default (
  <Route name="app" component={App} path="/">
    <Route path="zarizeni">
      <IndexRoute component={ZarizeniList} />
      <Route path=":id" component={Zarizeni}>
        <IndexRoute component={ZarizeniInfo} />
        <Route path="info" component={ZarizeniInfo} />
        <Route path="umistovani" component={Umistovani} />
        <Route component={NetvisionZarizeni} path="netvision" />
        <Route path="port">
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
    <Route path="orion/cp2type">
      <IndexRoute component={Cp2TypeList} />
    </Route>
    <Route path="hriste" component={Hriste} />
  </Route>
)
