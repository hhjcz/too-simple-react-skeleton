/** Created by hhj on 2/11/16. */
import responseTransformers from './responseTransformers'
import serializeParamsToUrl from './serializeParamsToUrl'

const defaultConfig = () => ({
  url: '/',
  responseTransformers,
})

export default function createResource(resourceName, _config, fetchHolder) {
  const config = { ...defaultConfig(), ..._config }

  const createMethod = (methodName, method = 'GET') => {
    const responseTransformer = config.responseTransformers[methodName]

    const fetchMethod = (params = {}, body = {}) => {
      const url = serializeParamsToUrl(config.url, params)

      const executeFetch = () => fetchHolder
        .fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-url-encoded',
            'Accept': 'application/json',
          },
          mode: 'opaque',
          // body: ['GET', 'HEAD'].indexOf(method) === -1 ? qs.stringify(body) : null
          body: ['GET', 'HEAD'].indexOf(method) === -1 ? JSON.stringify(body) : null
        })
        .then(response => {
          const normalizedResponse = responseTransformer(response)
          normalizedResponse.meta.lastFetchMark = url
          return normalizedResponse
        })
        .catch(error => {
          const message = `Ajejej, fetch error: ${error.message}, url: ${url}`
          throw new Error(message)
        })

      return { fetchUrl: url, executeFetch }
    }

    return fetchMethod
  }

  const fetchCollection = createMethod('fetchCollection')
  const fetchOne = createMethod('fetchOne')
  const create = createMethod('create', 'POST')
  const update = createMethod('update', 'PATCH')
  const destroy = createMethod('destroy', 'DELETE')

  return {
    fetchCollection,
    fetchOne,
    create,
    update,
    destroy,
  }
}
