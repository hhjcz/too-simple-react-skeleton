/** Created by hhj on 2/11/16. */
import responseTransformers from './responseTransformers'
import serializeParamsToUrl from './serializeParamsToUrl'

const defaultConfig = () => ({
  url: '/',
  responseTransformers,
})

export default function createResource(resourceName, _config, fetchHolder) {
  const config = { ...defaultConfig(), ..._config }

  const createAction = actionName => {
    const responseTransformer = config.responseTransformers[actionName]

    const fetchMethod = (params = {}, payload = {}) => {
      const url = serializeParamsToUrl(config.url, params)

      const fetchExecute = () => fetchHolder.fetch(url)
        .then(response => {
          const normalizedResponse = responseTransformer(response)
          normalizedResponse.meta.lastFetchMark = url
          return normalizedResponse
        })
        .catch(error => {
          console.log(`Ajejej, chybka resource: ${error}, url: ${url}`)
          throw new Error(error)
        })

      return { fetchUrl: url, fetchExecute }
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
