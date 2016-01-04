/**
 * Created by hhj on 12/18/15.
 */
import { List } from 'immutable'

import { Zarizeni } from '../zarizeni/core'

export function setList(state, seznamZarizeni) {
  return state.set('seznamZarizeni', List(seznamZarizeni).map(z => new Zarizeni(z)))
}
