/** Created by hhj on 1/29/16. */
import myRest from '../lib/rest/index'
import createFetch from '../lib/rest/createFetch'
import { Zarizeni } from './models/Zarizeni'
import { Umisteni } from './models/Umisteni'

const serverBaseUrl = process.env.SERVER_BASE_URL || 'http://localhost:8089/api'

const rest = myRest({
  zarizeni: {
    url: '/zarizeni/:id',
    itemTransformer: item => new Zarizeni(item)
  },
  umisteni: {
    url: '/umisteni/:id',
    itemTransformer: item => item
  },
  testEndpoint: {
    url: '/test/:id'
  }
}).use('fetch', createFetch(serverBaseUrl))

export const actions = rest.actions
export const reducers = rest.reducers

export default rest
