/** Created by hhj on 1/26/16. */
import fetch from 'isomorphic-fetch'

export default function createFetch(serverBaseUrl) {
  console.log('Creating fetch for server base URL: ', serverBaseUrl)

  return url => {

    const promise = new Promise((resolve, reject) => {
      fetch(serverBaseUrl + url)
        .then(
          response => {
            if (!response.ok) {
              reject(`${response.status} ${response.statusText}`)
            }
            resolve(response.json())  // parse json to object
          },
          error => {
            reject(error)
          })
    })

    return promise
  };
}
