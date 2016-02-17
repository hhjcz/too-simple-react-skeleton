/** Created by hhj on 2/17/16. */
import { Record } from 'immutable'
import { Lokalita } from './Lokalita'

export default class Umisteni extends Record({
  id: 0,
  checked: 0,
  confirmed: 0,
  lokalita: new Lokalita(),
}) {
}

export function UmisteniFactory(umisteniObj) {
  return new Umisteni({ ...umisteniObj, lokalita: (umisteniObj && umisteniObj.lokalita) ? new Lokalita(umisteniObj.lokalita) : null })
}
