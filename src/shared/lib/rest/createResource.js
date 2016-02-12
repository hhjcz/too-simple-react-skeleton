/** Created by hhj on 2/11/16. */
import queryGenerators from './queryGenerators'
import responseTransformers from './responseTransformers'

const defaultConfig = () => ({
  url: '/',
  responseTransformers,
  queryGenerators,
})

export default function createResource(resourceName, _config, fetchHolder) {
  const config = { ...defaultConfig(), ..._config }

  const createAction = actionName => {
    const queryGenerator = config.queryGenerators[actionName]
    const responseTransformer = config.responseTransformers[actionName]

    // TODO - refactor with no state nor location - should receive params, queryparams and payload (for POST)...
    const fetchMethod = ({ location, params, state }) => {
      // on server, get (initial) query from url (via location),
      // on client first project to window location, then get from window.location
      let queryString
      if (location) {
        queryString = location.search
      } else {
        queryString = queryGenerator(state)
      }
      let paramString = params && params.id ? `/${params.id}` : ''
      paramString = paramString + (params && params.zarizeni_id ? `?zarizeni_id=${params.zarizeni_id}` : '')
      const url = `${config.url}${paramString}${queryString}`

      const run = () => fetchHolder.fetch(url)
        .then(response => {
          const normalizedResponse = responseTransformer(response)
          normalizedResponse.meta.lastFetchMark = url
          return normalizedResponse
        })
        .catch(error => {
          console.log(`Ajejej, chybka resource: ${error}`)
          throw new Error(error)
        })

      return {
        url,
        queryString,
        run,
      }
    }

    return fetchMethod
  }

  const fetchAll = createAction('fetchAll')
  const fetchOne = createAction('fetchOne')

  return {
    fetchAll,
    fetchOne,
  }
}
