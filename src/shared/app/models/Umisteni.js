/** Created by hhj on 2/17/16. */
import { Record } from 'immutable'
import { Lokalita } from './Lokalita'

export class Umisteni extends Record({
  id: 0,
  checked: 0,
  confirmed: 0,
}) {
  constructor() {
    super(...arguments)
    const argObject = arguments[0] || {}
    this.lokalita = new Lokalita(argObject.lokalita)
  }
}

export default Umisteni
