/** Created by hhj on 2/16/16. */
import { Record } from 'immutable'

export class Lokalita extends Record({
  id: 0,
  ixlok: 0,
  kraj: '',
  obec: '',
  cast: '',
  ulice: '',
  cispop: 0,
  cisori: 0,
  cisdop: 0,
  cisevi: 0,
  akrlok: '',
  kodObjektUIR: 0,
  bunka: 0,
}) {
  constructor() {
    super(...arguments)
    this._chardop()
  }

  _chardop() {
    if (this.cisdop > 0) this.chardop = String.fromCharCode('a'.charCodeAt(0) + this.cisdop - 1)
    this.chardop = this.chardop || ''
  }
}

export default Lokalita
