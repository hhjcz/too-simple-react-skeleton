/** Created by hhj on 12/18/15. */
import { List } from 'immutable'

import { ZarizeniFactory } from '../app/models/Zarizeni'

export function setList(state, seznamZarizeni) {
  return state.set('seznamZarizeni', List(seznamZarizeni).map(z => ZarizeniFactory(z)))
}
