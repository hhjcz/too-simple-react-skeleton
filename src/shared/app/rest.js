/** Created by hhj on 1/29/16. */
import myRest from '../lib/rest/index'
import createFetch from '../lib/rest/createFetch'
import { ZarizeniFactory } from './models/Zarizeni'
import { UmisteniFactory } from './models/Umisteni'
import { Sort } from './models/Sort'

const serverBaseUrl = process.env.SERVER_BASE_URL || 'http://localhost:8089/api'

const rest = myRest({
  zarizeni: {
    url: '/zarizeni/:id',
    extraParams: { include: 'umisteni.lokalita' },
    itemTransformer: item => ZarizeniFactory(item),
    defaultState: { sort: new Sort({ dir: true, by: 'createdAt' }) }
  },
  umisteni: {
    url: '/umisteni/:id',
    extraParams: { include: 'lokalita.nepi_opy' },
    itemTransformer: item => UmisteniFactory(item),
    // itemTransformer: item => item,
  },
  testEndpoint: {
    url: '/test/:id'
  }
}).use('fetch', createFetch(serverBaseUrl))

export default rest

// export const actions = rest.actions
// export const reducers = rest.reducers
