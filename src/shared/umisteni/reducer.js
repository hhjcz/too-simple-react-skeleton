/** Created by hhj on 2/5/16. */
import rest from '../app/rest'

export default function reducer(state = {}, action) {
  return rest.reducers.umisteni(state, action)
}
