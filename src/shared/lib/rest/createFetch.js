/** Created by hhj on 1/26/16. */
import fetch from 'isomorphic-fetch'

export default function createFetch(serverBaseUrl) {
  console.log('Creating fetch for server base URL: ', serverBaseUrl)

  /** @return {Promise} */
  return url => fetch(serverBaseUrl + url)
    .then(
      response => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`)
        }
        return response.json()  // parse json to object
      })
}
