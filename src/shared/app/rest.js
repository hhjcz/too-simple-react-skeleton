/** Created by hhj on 1/29/16. */
import myRest from '../lib/rest/index'
import createFetch from '../lib/rest/createFetch'
import { ZarizeniFactory } from './models/Zarizeni'
import { UmisteniFactory } from './models/Umisteni'
import Lokalita from './models/Lokalita'
import { Sort } from './models/Sort'
import { Pagination } from './models/Pagination'

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
    defaultState: { pagination: new Pagination({ perPage: 1000000 }) }
    // itemTransformer: item => item,
  },
  lokalita: {
    url: '/lokalita/:id',
    itemTransformer: item => new Lokalita(item),
    defaultState: { pagination: new Pagination({ perPage: 20 }) }
  },
  testEndpoint: {
    url: '/test/:id'
  }
}).use('fetch', createFetch(serverBaseUrl))

export default rest

// export const actions = rest.actions
// export const reducers = rest.reducers
