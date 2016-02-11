/** Created by hhj on 1/29/16. */
import myRest from '../lib/rest/index'
import createFetch from '../lib/rest/createFetch'
import { Zarizeni } from '../zarizeni/core'

const serverBaseUrl = process.env.SERVER_BASE_URL || 'http://localhost:8089/api'

const rest = myRest({
  zarizeni: {
    url: '/zarizeni',
    itemTransformer: item => new Zarizeni(item)
  },
  umisteni: {
    url: '/umisteni',
  }
}).use('fetch', createFetch(serverBaseUrl))

export const actions = rest.actions

export default rest
