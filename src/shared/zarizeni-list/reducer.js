/** Created by hhj on 20.12.15. */
/* eslint-disable no-case-declarations */
import rest from '../app/rest'

export default function reducer(state = {}, action) {
  state = rest.reducers.zarizeni(state, action)
  return state
}
