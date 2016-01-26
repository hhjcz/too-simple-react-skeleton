/** Created by hhj on 1/26/16. */
import fetch from 'isomorphic-fetch'

export default function createFetch(serverBaseUrl) {
  console.log('Creating fetch for server base URL: ', serverBaseUrl)
  return (input, init) => {
    const url = serverBaseUrl + input
    return fetch(url, init)
  }
}
