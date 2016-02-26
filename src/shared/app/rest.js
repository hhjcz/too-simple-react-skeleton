/** Created by hhj on 1/29/16. */
import myRest from '../lib/rest/index'
import createFetch from '../lib/rest/createFetch'
import { ZarizeniFactory } from './models/Zarizeni'
import { UmisteniFactory } from './models/Umisteni'

const serverBaseUrl = process.env.SERVER_BASE_URL || 'http://localhost:8089/api'

const rest = myRest({
  zarizeni: {
    url: '/zarizeni/:id',
    itemTransformer: item => ZarizeniFactory(item)
  },
  neumistena: {
    url: '/zarizeni',
    extraParams: { _filter: 'neumistena', _fields: 'id', 'deleted_at-null': true, page: 1, per_page: 1000000 },
  },
  umisteni: {
    url: '/umisteni/:id',
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
