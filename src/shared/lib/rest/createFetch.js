/** Created by hhj on 1/26/16. */
import fetch from 'isomorphic-fetch'

export default function createFetch(serverBaseUrl) {
  console.log('Creating fetch for server base URL: ', serverBaseUrl)

  /** @return {Promise} */
  return (url, options = {}) => fetch(serverBaseUrl + url, options)
    .then(
      response => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`)
        }
        if (response.status === 204) return response
        return response.json()  // parse json to object
      })
}
