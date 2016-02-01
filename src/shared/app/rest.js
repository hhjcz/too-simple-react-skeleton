/** Created by hhj on 1/29/16. */
import myRest from '../lib/rest/index'
import createFetch from '../lib/rest/createFetch'

const serverBaseUrl = process.env.SERVER_BASE_URL || 'http://localhost:8089/api'

const rest = myRest({
  zarizeniList: {
    url: '/zarizeni'
  }
}).use('fetch', createFetch(serverBaseUrl))

export default rest
