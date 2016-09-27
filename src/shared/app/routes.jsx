/** Created by hhj on 12/23/15. */
/* eslint-disable import/no-named-as-default */
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import ZarizeniList from '../zarizeni-list'
import Zarizeni from '../zarizeni'
import ZarizeniInfo from '../zarizeni/info'
import Umistovani from '../zarizeni/umistovani'
import NetvisionZarizeni from '../zarizeni/info/NetvisionZarizeni'
import PortyZarizeni from '../port/PortyZarizeni'
import PortZarizeni from '../port/PortZarizeni'
import LokalitaList from '../lokalita-list'
import Lokalita from '../lokalita-detail'
import UdalostList from '../udalost-list'
import Cp2TypeList from '../orion/cp2type'
import ZarizeniKeSlouceni from '../zarizeni-ke-slouceni'
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
    <Route path="orion">
      <Route path="cp2type" component={Cp2TypeList} />
    </Route>
    <Route path="udrzba">
      <Route path="zarizeni_ke_slouceni" component={ZarizeniKeSlouceni} />
    </Route>
    <Route path="hriste" component={Hriste} />
  </Route>
)
