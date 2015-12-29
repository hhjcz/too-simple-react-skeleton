/**
 * Created by hhj on 12/18/15.
 */
import {List} from 'immutable'

export function setList(state, seznamZarizeni) {
  return state.set('seznamZarizeni', List(seznamZarizeni))
}
